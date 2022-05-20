import transactionModel from "../models/transactionModel.js";
import inventoryModel from "../models/inventoryModel.js";
import cumulativeGetterModel from "../models/cumulativeGetterModel.js";
import constants from "../utils/constants.js";

const findInventorybyId = async (inventoryId) => {
  let inventory = null;
  try {
    inventory = await inventoryModel.findById({ _id: inventoryId });
  } catch (error) {
    console.log(error);
  }
  return inventory;
};

const calulateInventoryUpdatedValuesAfterInventoryPurchase = (
  inventory,
  transaction
) => {
  inventory.quantity = inventory.quantity + transaction.purchaseQuantity;
  inventory.amount =
    inventory.amount +
    Math.round(transaction.cash) +
    Math.round(transaction.bank) +
    Math.round(transaction.payable);
  return inventory;
};

const updateInventory = async (inventory) => {
  const updateInventory = new inventoryModel(inventory);
  updateInventory.isNew = false;
  // console.log(inventory);
  try {
    await updateInventory.save();
  } catch (error) {
    console.log(error);
  }
};

const saveNewTransaction = async (transaction) => {
  let newTransaction = new transactionModel(transaction);
  try {
    return await newTransaction.save();
  } catch (error) {
    console.log(error);
  }
  return null;
};

const findAssetbyIdandSubAccount = async (assetId, subAccount) => {
  let asset = null;
  try {
    asset = await transactionModel.findOne({ assetId, subAccount });
  } catch (error) {
    console.log(error);
  }
  return asset;
};

const findAssetDepreciation = async (assetId) => {
  let depreciationTransactions = [];
  try {
    depreciationTransactions = await transactionModel.find({
      _id: assetId,
      subAccount: "Asset Depreciation",
    });
  } catch (error) {
    console.log(error);
  }
  let totaldepreciation = 0;
  depreciationTransactions.forEach(
    (depreciationTransaction) =>
      (totaldepreciation += depreciationTransaction.depreciation)
  );
  return totaldepreciation;
};

export const createAssetSaleTransactionService = async (transaction, user) => {
  let asset = await findAssetbyIdandSubAccount(
    transaction.assetId,
    "Asset Purchase"
  );
  let assetDepreciation = await findAssetDepreciation(transaction.assetId);
  let assetSaleGain = transaction.credit + assetDepreciation - asset.debit;
  transaction.remainingAssetValue = asset.debit - assetDepreciation;
  transaction.assetSaleGain = assetSaleGain;
  return await saveNewTransaction(transaction);
};

export const createInventoryPurchaseTransactionService = async (
  transaction,
  user
) => {
  let inventory = await findInventorybyId(transaction.inventoryId);
  inventory = calulateInventoryUpdatedValuesAfterInventoryPurchase(
    inventory,
    transaction
  );
  await updateInventory(inventory);
  return await saveNewTransaction(transaction);
};

const findTransactionsByInventoryIdAndSubAccount = async (
  inventoryId,
  subAccount
) => {
  try {
    return await transactionModel.find({ inventoryId, subAccount });
  } catch (error) {
    console.log(error);
  }
  return null;
};

const updateInventoryPurchaseTransactions = async (
  saleTransaction,
  transactions
) => {
  let cogs = 0;
  let sQ = saleTransaction.saleQuantity;
  let BreakException = {};

  try {
    transactions.forEach((transaction, index) => {
      if (sQ > 0) {
        if (transaction.purchaseQuantity > sQ) {
          cogs += sQ * transaction.perUnit;
          transactions[index].purchaseQuantity =
            transaction.purchaseQuantity - sQ;
          transactions[index].soldQuantity = sQ;
          throw BreakException;
        } else {
          cogs = cogs + transaction.purchaseQuantity * transaction.perUnit;
          transactions[index].soldQuantity =
            transactions[index].purchaseQuantity;
          sQ = sQ - transaction.purchaseQuantity;
          transactions[index].purchaseQuantity = 0;
        }
      } else {
        throw BreakException;
      }
    });
  } catch (e) {
    if (e !== BreakException) throw e;
  }

  let bulkArr = [];

  for (const i of transactions) {
    bulkArr.push({
      updateOne: {
        filter: { _id: i._id },
        update: {
          $set: {
            purchaseQuantity: i.purchaseQuantity,
            soldQuantity: i.soldQuantity,
          },
        },
      },
    });
  }

  await transactionModel.bulkWrite(bulkArr);
  return cogs;
};

export const createInventorySaleTransactionService = async (
  saleTransaction,
  user
) => {
  let transactions = await findTransactionsByInventoryIdAndSubAccount(
    saleTransaction.inventoryId,
    "Inventory Purchase"
  );

  let cogs = await updateInventoryPurchaseTransactions(
    saleTransaction,
    transactions
  );

  let inventory = await findInventorybyId(saleTransaction.inventoryId);

  inventory.quantity = inventory.quantity - saleTransaction.saleQuantity;
  inventory.amount = inventory.amount - cogs;
  await updateInventory(inventory);

  saleTransaction.cogs = cogs;
  return await saveNewTransaction(saleTransaction);
};

export const createGettersDataService = async (transaction, user) => {
  let currentCumulativeRecord = await getCurrentCumulativeGetter(user);
  let accountClass = transaction.accountClass;
  let subAccount = transaction.subAccount;

  if (
    accountClass == constants.income.accountClass ||
    transaction.loanFlag == constants.loanFlag.loanAcquisition ||
    transaction.receivableFlag ==
      constants.receivableFlag.receivedTransaction ||
    subAccount == constants.equity.subAccount.capitalInvested
  ) {
    let totaLAmount = transaction.bank + transaction.cash;

    currentCumulativeRecord.balance += totaLAmount;
    currentCumulativeRecord.bank += transaction.bank;
    currentCumulativeRecord.cash += transaction.cash;
    currentCumulativeRecord.inflow += totaLAmount;
  } else if (
    accountClass == constants.expense.accountClass ||
    transaction.loanFlag == constants.loanFlag.installmentPayment ||
    transaction.payableFlag == constants.payableFlag.paidTransaction ||
    subAccount == constants.equity.subAccount.withdrawl ||
    subAccount == constants.equity.subAccount.personalExpense
  ) {
    let totaLAmount = transaction.bank + transaction.cash;

    currentCumulativeRecord.balance -= totaLAmount;
    currentCumulativeRecord.bank -= transaction.bank;
    currentCumulativeRecord.cash -= transaction.cash;
    currentCumulativeRecord.outflow += totaLAmount;
  }

  if (accountClass == constants.income.accountClass) {
    if (transaction.receivableFlag == constants.receivableFlag.receivable) {
      currentCumulativeRecord.receivable += transaction.receivable;
      currentCumulativeRecord.totalAssets += transaction.receivable;
    }

    if (subAccount == constants.income.subAccount.productSale) {
      currentCumulativeRecord.inventory -= transaction.cogs;
      currentCumulativeRecord.totalCummulativeInventory -= transaction.cogs;
      currentCumulativeRecord.totalAssets -= transaction.cogs;
      currentCumulativeRecord.productSales += transaction.credit;
      currentCumulativeRecord.sales += transaction.credit; // - transaction.debit;
      currentCumulativeRecord.cogs += transaction.cogs; // inventory refund cogs calculation in version 2
      currentCumulativeRecord.netProfit +=
        transaction.credit - transaction.cogs; // discussion on cogs sign for refund case
      currentCumulativeRecord.retainedEarning +=
        transaction.credit - transaction.cogs;
    } else if (subAccount == constants.income.subAccount.subscription) {
      currentCumulativeRecord.subscription += transaction.credit; // - transaction.debit;
      currentCumulativeRecord.sales += transaction.credit; // - transaction.debit;
      currentCumulativeRecord.netProfit += transaction.credit; // - transaction.debit;
    } else if (subAccount == constants.income.subAccount.service) {
      currentCumulativeRecord.services += transaction.credit; // - transaction.debit;
      currentCumulativeRecord.sales += transaction.credit; // - transaction.debit;
      currentCumulativeRecord.netProfit += transaction.credit; // - transaction.debit;
    } else if (subAccount == constants.income.subAccount.assetSale) {
      currentCumulativeRecord.fixedAsset -= transaction.remainingAssetValue;
      currentCumulativeRecord.assetSale += transaction.cash + transaction.bank;
      currentCumulativeRecord.assetSaleGain += transaction.assetSaleGain;
      currentCumulativeRecord.otherIncome += transaction.assetSaleGain;
      currentCumulativeRecord.netProfit += transaction.assetSaleGain;
      currentCumulativeRecord.retainedEarning += transaction.assetSaleGain;
    } else {
      if (subAccount == constants.income.subAccount.rentReceived) {
        currentCumulativeRecord.rentReceived += transaction.credit;
      } else if (subAccount == constants.income.subAccount.miscellaneous) {
        currentCumulativeRecord.miscellaneousIncome += transaction.credit;
      }
      currentCumulativeRecord.otherIncome += transaction.credit;
      currentCumulativeRecord.netProfit += transaction.credit;
      currentCumulativeRecord.retainedEarning += transaction.credit;
    }
  } else if (accountClass == constants.expense.accountClass) {
    if (transaction.payableFlag == constants.payableFlag.payable) {
      currentCumulativeRecord.payable += transaction.payable;
      currentCumulativeRecord.totalLiabilities += transaction.payable;
      currentCumulativeRecord.equity += transaction.payable;
    }

    if (subAccount == constants.expense.subAccount.assetPurchase) {
      currentCumulativeRecord.fixedAsset += transaction.debit;
      currentCumulativeRecord.capitalExpenditure +=
        transaction.cash + transaction.bank;
      currentCumulativeRecord.totalAssets += transaction.debit;
    } else if (subAccount == constants.expense.subAccount.inventoryPurchase) {
      currentCumulativeRecord.inventory += transaction.debit;
      currentCumulativeRecord.totalCummulativeInventory += transaction.debit;
      currentCumulativeRecord.totalAssets += transaction.debit;
    } else if (subAccount == constants.expense.subAccount.financeCost) {
      currentCumulativeRecord.financeCost += transaction.interest;
      currentCumulativeRecord.otherExpense += transaction.interest;
    } else {
      if (subAccount == constants.expense.subAccount.marketing) {
        currentCumulativeRecord.adsAndMarketing += transaction.debit;
      } else if (subAccount == constants.expense.subAccount.salary) {
        currentCumulativeRecord.salaries += transaction.debit;
      } else if (subAccount == constants.expense.subAccount.admin) {
        currentCumulativeRecord.adminExpenses += transaction.debit;
      } else if (subAccount == constants.expense.subAccount.utility) {
        currentCumulativeRecord.utilityExpense += transaction.debit;
      } else if (subAccount == constants.expense.subAccount.miscellaneous) {
        currentCumulativeRecord.miscellaneous += transaction.debit;
      } else if (
        subAccount == constants.expense.subAccount.researchAndDevelopment
      ) {
        currentCumulativeRecord.researchAndDevelopment += transaction.debit;
      } else if (subAccount == constants.expense.subAccount.rentPayment) {
        currentCumulativeRecord.rentPayment += transaction.debit;
      } else if (subAccount == constants.expense.subAccount.assetDepreciation) {
        currentCumulativeRecord.depreciation += transaction.debit;
        currentCumulativeRecord.fixedAsset -= transaction.debit;
      } else if (
        subAccount == constants.expense.subAccount.businessEntertainment
      ) {
        currentCumulativeRecord.businessEntertainment += transaction.debit;
      }
      currentCumulativeRecord.otherExpense += transaction.debit;
      currentCumulativeRecord.netProfit -= transaction.debit;
      currentCumulativeRecord.retainedEarning -= transaction.debit;
    }
  } else if (accountClass == constants.asset.accountClass) {
    if (
      transaction.receivableFlag == constants.receivableFlag.receivedTransaction
    ) {
      currentCumulativeRecord.receivable -= transaction.credit;
      currentCumulativeRecord.totalAssets -= transaction.credit;
    }

    if (subAccount == constants.asset.subAccount.softwareDevelopment) {
      currentCumulativeRecord.softwareDevelopment += transaction.debit;
      currentCumulativeRecord.capitalExpenditure +=
        transaction.cash + transaction.bank;
      currentCumulativeRecord.totalAssets += transaction.debit;
    }
  } else if (accountClass == constants.liability.accountClass) {
    if (transaction.payableFlag == constants.payableFlag.paidTransaction) {
      currentCumulativeRecord.payable -= transaction.debit;
      currentCumulativeRecord.totalLiabilities -= transaction.debit;
    }

    if (transaction.loanFlag == constants.loanFlag.loanAcquisition) {
      currentCumulativeRecord.loan += transaction.credit;
      currentCumulativeRecord.loanReceived += transaction.credit;
      currentCumulativeRecord.totalLiabilities += transaction.credit;
      currentCumulativeRecord.equity += transaction.credit;
    } else if (transaction.loanFlag == constants.loanFlag.installmentPayment) {
      currentCumulativeRecord.loan -= transaction.principal;
      currentCumulativeRecord.principalRepayment += transaction.principal;
      currentCumulativeRecord.totalLiabilities -= transaction.principal;
    }
  } else if (accountClass == constants.equity.accountClass) {
    if (subAccount == constants.equity.subAccount.capitalInvested) {
      currentCumulativeRecord.capitalInvested += transaction.credit;
      currentCumulativeRecord.equity += transaction.credit;
    } else if (subAccount == constants.equity.subAccount.withdrawl) {
      currentCumulativeRecord.withdrawls += transaction.debit;
      currentCumulativeRecord.retainedEarning -= transaction.debit;
      currentCumulativeRecord.equity -= transaction.debit;
    } else if (subAccount == constants.equity.subAccount.personalExpense) {
      currentCumulativeRecord.personalExpense += transaction.debit;
      currentCumulativeRecord.retainedEarning -= transaction.debit;
      currentCumulativeRecord.equity -= transaction.debit;
    }
  }

  await addMissingGetterRecords(user);
  await currentCumulativeRecord.save();
};

const addMissingGetterRecords = async (user) => {
  let date = new Date();
  date.setHours(5, 0, 0, 0);

  let lastCumulativeRecord = await cumulativeGetterModel
    .findOne({ companyId: user.companyId })
    .sort({ date: -1 });

  if (lastCumulativeRecord) {
    let lastRecordDate = lastCumulativeRecord.date;
    console.log("here in addMissingGetterRecords" + lastCumulativeRecord);

    while (1) {
      console.log("here in while");
      lastRecordDate.setDate(lastRecordDate.getDate() + 1);
      if (lastRecordDate < date) {
        let lCR = new cumulativeGetterModel();
        lastCumulativeRecord._id = lCR._id;
        lastCumulativeRecord.date = lastRecordDate;
        lastCumulativeRecord.isNew = true;

        await lastCumulativeRecord.save();
      } else break;
    }
  }
};

// const getCurrentDailyGetter = async () => {
//   let date = new Date();
//   date.setHours(5, 0, 0, 0);
//   let currentDayRecord = null;
//   try {
//     currentDayRecord = await dailyGetterModel.findOne({ date });
//   } catch (error) {
//     console.log(error);
//   }
//   // console.log(currentDayRecord);
//   if (currentDayRecord == null) {
//     return getNewDailyGetterModel();
//   }
//   return currentDayRecord;
// };

const getCurrentCumulativeGetter = async (user) => {
  let date = new Date();
  date.setHours(5, 0, 0, 0);
  let cumulativeRecord = null;
  try {
    cumulativeRecord = await cumulativeGetterModel.findOne({
      date,
      companyId: user.companyId,
    });
  } catch (error) {
    console.log(error);
  }
  if (cumulativeRecord == null) {
    return await getLastCumulativeRecord(user);
  } else {
    cumulativeRecord.isNew = false;
  }
  return cumulativeRecord;
};

const getLastCumulativeRecord = async (user) => {
  let lastCumulativeRecord = await cumulativeGetterModel
    .findOne({ companyId: user.companyId })
    .sort({ date: -1 });

  if (lastCumulativeRecord !== null) {
    let lCR = new cumulativeGetterModel();
    let date = new Date();
    date.setHours(5, 0, 0, 0);
    lastCumulativeRecord.date = date;
    lastCumulativeRecord.totalCummulativeInventory =
      lastCumulativeRecord.inventory +
      lastCumulativeRecord.totalCummulativeInventory;
    lastCumulativeRecord._id = lCR._id;
    lastCumulativeRecord.isNew = true;
    return lastCumulativeRecord;
  } else {
    return getNewCumulativeGetterModel(user);
  }
};

export const getNewCumulativeGetterModel = (user) => {
  let newModel = new cumulativeGetterModel();
  let date = new Date();
  date.setHours(5, 0, 0, 0);
  newModel.date = date;
  newModel.inflow = 0;
  newModel.outflow = 0;
  newModel.cash = 0;
  newModel.bank = 0;
  newModel.balance = 0;
  newModel.productSales = 0;
  newModel.subscription = 0;
  newModel.services = 0;
  newModel.assetSale = 0;
  newModel.sales = 0;
  newModel.cogs = 0;
  newModel.assetSaleGain = 0;
  newModel.rentReceived = 0;
  newModel.miscellaneousIncome = 0;
  newModel.otherIncome = 0;

  newModel.adsAndMarketing = 0;
  newModel.salaries = 0;
  newModel.adminExpenses = 0;
  newModel.utilityExpense = 0;
  newModel.miscellaneousExpense = 0;
  newModel.financeCost = 0;
  newModel.researchAndDevelopment = 0;
  newModel.rentPayment = 0;
  newModel.depreciation = 0;
  newModel.businessEntertainment = 0;
  newModel.otherExpense = 0;

  newModel.netProfit = 0;
  newModel.inventory = 0;
  newModel.totalCummulativeInventory = 0;
  newModel.receivable = 0;
  newModel.fixedAsset = 0;
  newModel.softwareDevelopment = 0;
  newModel.totalAssets = 0;

  newModel.payable = 0;
  newModel.loan = 0;
  newModel.loanReceived = 0;
  newModel.principalRepayment = 0;
  newModel.totalLiabilities = 0;
  newModel.capitalExpenditure = 0;
  newModel.capitalInvested = 0;
  newModel.withdrawls = 0;
  newModel.personalExpense = 0;
  newModel.retainedEarning = 0;
  newModel.equity = 0;

  newModel.userId = user._id;
  newModel.companyId = user.companyId;

  return newModel;
};
