import cumulativeGetterModel from "../models/cumulativeGetterModel.js";
import transactionModel from "../models/transactionModel.js";
import customerModel from "../models/customerModel.js";
import { getNewCumulativeGetterModel } from "./transactionService.js";

export const getDashboardGettersService = async (period = "month", user) => {
  let currentDate = new Date();
  currentDate.setHours(5, 0, 0, 0);
  let lastRecord = await getCurrentPeriodLastCumulativeRecord(
    currentDate,
    period,
    user
  );

  let prevRecord = null;
  if (lastRecord) {
    prevRecord = await getPreviousPeriodLastCumulativeRecord(
      lastRecord.date,
      period,
      user
    );
    if (prevRecord == null) prevRecord = getNewCumulativeGetterModel(user);
  } else {
    lastRecord = await getBeforeOrGivenDateLastCumulativeRecord(
      currentDate,
      user
    );
    prevRecord = lastRecord;
  }
  let thirdLastRecord = null;
  if (prevRecord) {
    thirdLastRecord = await getPreviousPeriodLastCumulativeRecord(
      prevRecord.date,
      period,
      user
    );
  }

  if (lastRecord) {
    let inflow = lastRecord.inflow - prevRecord.inflow;
    let outflow = lastRecord.outflow - prevRecord.outflow;
    let balance = lastRecord.balance;
    let sales = lastRecord.sales - prevRecord.sales;
    let expense =
      lastRecord.otherExpense +
      lastRecord.cogs -
      (prevRecord.otherExpense + prevRecord.cogs);
    let salesPrevPeriod =
      prevRecord.sales - (thirdLastRecord ? thirdLastRecord.sales : 0);
    let expensePrevPeriod =
      prevRecord.otherExpense +
      prevRecord.cogs -
      (thirdLastRecord
        ? thirdLastRecord.otherExpense + thirdLastRecord.cogs
        : 0);
    let salesChange =
      salesPrevPeriod !== 0
        ? ((sales - salesPrevPeriod) / salesPrevPeriod).toFixed(2)
        : 0;
    let expenseChange =
      expensePrevPeriod !== 0
        ? ((expense - expensePrevPeriod) / expensePrevPeriod).toFixed(2)
        : 0;
    let graphData = await getGraphData(lastRecord, period, 5, user);

    return {
      inflow,
      outflow,
      balance,
      sales,
      salesChange,
      expense,
      expenseChange,
      graphData,
    };
  } else {
    return {
      inflow: 0,
      outflow: 0,
      balance: 0,
      sales: 0,
      salesChange: 0,
      expense: 0,
      expenseChange: 0,
      graphData: [],
    };
  }
};

function ordinal_suffix_of(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

const getGraphData = async (lastRecord, period, numOfPoints, user) => {
  // console.log("lcr = " + lastRecord);
  let data = [];
  let lastCummulativeRecord = lastRecord;
  let sales = lastCummulativeRecord.sales;
  let expense = lastCummulativeRecord.cogs + lastCummulativeRecord.otherExpense;
  let profit = sales - expense;
  let name = "last " + period;

  data.push({ name, revenue: sales, sales, profit, expense });

  for (let i = 2; i <= numOfPoints; i++) {
    lastCummulativeRecord = await getPreviousPeriodLastCumulativeRecord(
      lastCummulativeRecord.date,
      period,
      user
    );
    if (lastCummulativeRecord) {
      sales = lastCummulativeRecord.sales;
      expense = lastCummulativeRecord.cogs + lastCummulativeRecord.otherExpense;
      profit = sales - expense;
      name = `${ordinal_suffix_of(i)} last ${period}`;
      data.unshift({ name, revenue: sales, sales, profit, expense });
    } else {
      break;
    }
  }

  return data;
};

export const getPerformanceTrackerGettersService = async (
  period = "month",
  user
) => {
  let totalDays = await getTotalDays(user);
  let currentDate = new Date();
  currentDate.setHours(5, 0, 0, 0);
  let lastRecord = await getCurrentPeriodLastCumulativeRecord(
    currentDate,
    period,
    user
  );
  let prevRecord = null;
  console.log("here now totalDays = " + totalDays);
  if (lastRecord) {
    prevRecord = await getPreviousPeriodLastCumulativeRecord(
      lastRecord.date,
      period,
      user
    );
    if (prevRecord == null) prevRecord = getNewCumulativeGetterModel(user);
  } else {
    lastRecord = await getBeforeOrGivenDateLastCumulativeRecord(
      currentDate,
      user
    );
    prevRecord = lastRecord;
  }
  if (lastRecord) {
    let quickRatio = await getPerformanceTrackerData(
      performanceTrackerConstants.quickRatio,
      lastRecord,
      prevRecord,
      totalDays,
      user
    );
    let cashRatio = await getPerformanceTrackerData(
      performanceTrackerConstants.cashRatio,
      lastRecord,
      prevRecord,
      totalDays,
      user
    );
    let currentRatio = await getPerformanceTrackerData(
      performanceTrackerConstants.currentRatio,
      lastRecord,
      prevRecord,
      totalDays,
      user
    );
    let grossProfitMargin = await getPerformanceTrackerData(
      performanceTrackerConstants.grossProfitMargin,
      lastRecord,
      prevRecord,
      totalDays,
      user
    );
    let netProfitMargin = await getPerformanceTrackerData(
      performanceTrackerConstants.netProfitMargin,
      lastRecord,
      prevRecord,
      totalDays,
      user
    );
    let inventoryTurnover = await getPerformanceTrackerData(
      performanceTrackerConstants.inventoryTurnover,
      lastRecord,
      prevRecord,
      totalDays,
      user
    );
    let marketingExpenseRatio = await getPerformanceTrackerData(
      performanceTrackerConstants.marketingExpenseRatio,
      lastRecord,
      prevRecord,
      totalDays,
      user
    );
    let runway = await getPerformanceTrackerData(
      performanceTrackerConstants.runway,
      lastRecord,
      prevRecord,
      totalDays,
      user
    );
    let customerAcquisitionCost = await getPerformanceTrackerData(
      performanceTrackerConstants.customerAcquisitionCost,
      lastRecord,
      prevRecord,
      totalDays,
      user
    );
    let growthRate = await getPerformanceTrackerData(
      performanceTrackerConstants.growthRate,
      lastRecord,
      prevRecord,
      totalDays,
      user
    );

    return {
      quickRatio,
      cashRatio,
      currentRatio,
      grossProfitMargin,
      netProfitMargin,
      inventoryTurnover,
      marketingExpenseRatio,
      runway,
      customerAcquisitionCost,
      growthRate,
    };
  } else {
    return {
      quickRatio: [],
      cashRatio: [],
      currentRatio: [],
      grossProfitMargin: [],
      netProfitMargin: [],
      inventoryTurnover: [],
      marketingExpenseRatio: [],
      runway: [],
      customerAcquisitionCost: [],
      growthRate: [],
    };
  }
};

const getPerformanceTrackerData = async (
  equation,
  lastRecord,
  prevRecord,
  totalDays,
  user,
  period = "month",
  numOfPoints = 5
) => {
  let data = [];
  let value = await equationFunction(
    equation,
    lastRecord,
    prevRecord,
    totalDays,
    user
  );
  let name = "last " + period;

  data.push({ name, value });

  for (let i = 2; i <= numOfPoints; i++) {
    lastRecord = await getPreviousPeriodLastCumulativeRecord(
      lastRecord.date,
      period,
      user
    );
    if (lastRecord) {
      value = await equationFunction(
        equation,
        lastRecord,
        prevRecord,
        totalDays,
        user
      );
      name = `${ordinal_suffix_of(i)} last ${period}`;
      data.unshift({ name, value });
    } else {
      break;
    }
  }

  return data;
};

const performanceTrackerConstants = {
  quickRatio: "quickRatio",
  cashRatio: "cashRatio",
  currentRatio: "currentRatio",
  grossProfitMargin: "grossProfitMargin",
  netProfitMargin: "netProfitMargin",
  inventoryTurnover: "inventoryTurnover",
  marketingExpenseRatio: "marketingExpenseRatio",
  runway: "runway",
  customerAcquisitionCost: "customerAcquisitionCost",
  growthRate: "growthRate",
};

const equationFunction = async (
  equation,
  lastRecord,
  prevRecord,
  totalDays,
  user
) => {
  switch (equation) {
    case performanceTrackerConstants.quickRatio:
      return getQuickRatio(lastRecord, user);
    case performanceTrackerConstants.cashRatio:
      return getCashRatio(lastRecord, user);
    case performanceTrackerConstants.currentRatio:
      return getCurrentRatio(lastRecord, user);
    case performanceTrackerConstants.grossProfitMargin:
      return getGrossProfitMargin(lastRecord, prevRecord, user);
    case performanceTrackerConstants.netProfitMargin:
      return getNetProfitMargin(lastRecord, prevRecord, user);
    case performanceTrackerConstants.inventoryTurnover:
      return getInventoryTurnover(lastRecord, prevRecord, totalDays, user);
    case performanceTrackerConstants.marketingExpenseRatio:
      return getMarketingExpenseRatio(lastRecord, prevRecord, user);
    case performanceTrackerConstants.runway:
      return getRunway(lastRecord, totalDays, user);
    case performanceTrackerConstants.customerAcquisitionCost:
      return await getCustomerAcquisitionCost(lastRecord, prevRecord, user);
    case performanceTrackerConstants.growthRate:
      return await getGrowthRate(lastRecord, prevRecord, user);
    default:
  }
};

const getQuickRatio = (lastRecord, user) => {
  if (lastRecord.payable == 0) return 0;
  else
    return (
      (lastRecord.balance + lastRecord.receivable) /
      lastRecord.payable
    ).toFixed(2);
};

const getCashRatio = (lastRecord, user) => {
  if (lastRecord.payable == 0) return 0;
  else return (lastRecord.balance / lastRecord.payable).toFixed(2);
};

const getCurrentRatio = (lastRecord, user) => {
  if (lastRecord.payable == 0) return 0;
  else
    return (
      (lastRecord.cash + lastRecord.receivable + lastRecord.inventory) /
      lastRecord.payable
    ).toFixed(2);
};

const getGrossProfitMargin = (lastRecord, prevRecord, user) => {
  let sales = lastRecord.sales - prevRecord.sales;
  let cogs = lastRecord.cogs - prevRecord.cogs;

  if (sales == 0) return 0;
  else return (((sales - cogs) / sales) * 100).toFixed(2);
};

const getNetProfitMargin = (lastRecord, prevRecord, user) => {
  let netProfit = lastRecord.netProfit - prevRecord.netProfit;
  let sales = lastRecord.sales - prevRecord.sales;

  if (sales == 0) return 0;
  else return ((netProfit / sales) * 100).toFixed(2);
};

const getInventoryTurnover = (lastRecord, prevRecord, totalDays, user) => {
  let cogs = lastRecord.cogs - prevRecord.cogs;
  let averageInventory =
    totalDays == 0 ? 0 : lastRecord.totalCummulativeInventory / totalDays;

  if (averageInventory == 0) return 0;
  else return (cogs / averageInventory).toFixed(2);
};

const getMarketingExpenseRatio = (lastRecord, prevRecord, user) => {
  let adsAndMarketing = lastRecord.adsAndMarketing - prevRecord.adsAndMarketing;
  let sales = lastRecord.sales - prevRecord.sales;

  if (sales == 0) return 0;
  else return ((adsAndMarketing / sales) * 100).toFixed(2);
};

const getRunway = (lastRecord, totalDays, user) => {
  let averageOtherExpense =
    totalDays == 0 ? 0 : lastRecord.otherExpense / totalDays;

  if (averageOtherExpense == 0) return 0;
  else return (lastRecord.balance / averageOtherExpense).toFixed(2);
};

const getCustomerAcquisitionCost = async (lastRecord, prevRecord, user) => {
  let adsAndMarketing = lastRecord.adsAndMarketing - prevRecord.adsAndMarketing;
  let newCustomersCount = await getNewCustomersInCurrentMonth(user);

  if (newCustomersCount == 0) return 0;
  else return (adsAndMarketing / newCustomersCount).toFixed(2);
};

const getGrowthRate = async (lastRecord, prevRecord, user) => {
  let sales = lastRecord.sales - prevRecord.sales;
  let thirdLastRecord = await getPreviousPeriodLastCumulativeRecord(
    lastRecord.date,
    "month",
    user
  );
  let salesPrevPeriod =
    prevRecord.sales - (thirdLastRecord ? thirdLastRecord.sales : 0);

  if (salesPrevPeriod == 0) return 0;
  else return (((sales - salesPrevPeriod) / salesPrevPeriod) * 100).toFixed(2);
};

export const getIncomStatementGettersService = async (
  startDate,
  endDate,
  user
) => {
  let toRecord = await getBetweenDateRangeLastCumulativeRecord(
    startDate,
    endDate,
    user
  );
  let fromRecord = null;
  if (toRecord) {
    fromRecord = await getBeforeOrGivenDateLastCumulativeRecord(
      startDate,
      user
    );
    if (fromRecord == null) fromRecord = getNewCumulativeGetterModel(user);
  } else {
    toRecord = await getBeforeOrGivenDateLastCumulativeRecord(endDate, user);
    fromRecord = toRecord;
  }

  if (toRecord) {
    let productSales = toRecord.productSales - fromRecord.productSales;
    let services = toRecord.services - fromRecord.services;
    let subscription = toRecord.subscription - fromRecord.subscription;
    let revenue = toRecord.sales - fromRecord.sales;
    let cogs = toRecord.cogs - fromRecord.cogs;
    let grossProfit = revenue - cogs;

    let assetSaleGain = toRecord.assetSaleGain - fromRecord.assetSaleGain;
    let rentReceived = toRecord.rentReceived - fromRecord.rentReceived;
    let miscellaneousIncome =
      toRecord.miscellaneousIncome - fromRecord.miscellaneousIncome;
    let otherIncome = toRecord.otherIncome - fromRecord.otherIncome;

    let adsAndMarketing = toRecord.adsAndMarketing - fromRecord.adsAndMarketing;
    let salaries = toRecord.salaries - fromRecord.salaries;
    let adminExpenses = toRecord.adminExpenses - fromRecord.adminExpenses;
    let utilityExpense = toRecord.utilityExpense - fromRecord.utilityExpense;
    let miscellaneousExpense =
      toRecord.miscellaneousExpense - fromRecord.miscellaneousExpense;
    let financeCost = toRecord.financeCost - fromRecord.financeCost;
    let researchAndDevelopment =
      toRecord.researchAndDevelopment - fromRecord.researchAndDevelopment;
    let rentPayment = toRecord.rentPayment - fromRecord.rentPayment;
    let depreciation = toRecord.depreciation - fromRecord.depreciation;
    let businessEntertainment =
      toRecord.businessEntertainment - fromRecord.businessEntertainment;
    let otherExpense = toRecord.otherExpense - fromRecord.otherExpense;
    let netProfit = toRecord.netProfit - fromRecord.netProfit;

    return {
      revenue: {
        productSales,
        services,
        subscription,
      },
      totalRevenue: revenue,
      cogs,
      grossProfit,

      otherIncome: {
        assetSaleGain,
        rentReceived,
        miscellaneousIncome,
      },
      totalOtherIncome: otherIncome,

      otherExpense: {
        adsAndMarketing,
        salaries,
        adminExpenses,
        utilityExpense,
        miscellaneousExpense,
        financeCost,
        researchAndDevelopment,
        rentPayment,
        depreciation,
        businessEntertainment,
      },
      totalOtherExpense: otherExpense,
      netProfit,
    };
  } else {
    return {
      revenue: {},
      totalRevenue: 0,
      cogs: 0,
      grossProfit: 0,

      otherIncome: {},
      totalOtherIncome: 0,

      otherExpense: {},
      totalOtherExpense: 0,
      netProfit: 0,
    };
  }
};

export const getBalanceSheetGettersService = async (date, user) => {
  let currentDate = new Date(date);
  currentDate.setHours(5, 0, 0, 0);

  let lastRecord = await getBeforeOrGivenDateLastCumulativeRecord(
    currentDate,
    user
  );

  if (lastRecord) {
    let cash = lastRecord.cash;
    let bank = lastRecord.bank;
    let receivable = lastRecord.receivable;
    let inventory = lastRecord.inventory;
    let totalCurrentAssets = cash + bank + receivable + inventory;

    let fixedAsset = lastRecord.fixedAsset;
    let softwareDevelopment = lastRecord.softwareDevelopment;
    let totalNonCurrentAssets = fixedAsset + softwareDevelopment;
    let totalAssets = totalCurrentAssets + totalNonCurrentAssets;

    let payable = lastRecord.payable;
    let totalCurrentLiabilities = payable;

    let loan = lastRecord.loan;
    let totalNonCurrentLiabilities = loan;
    let totalLiabilities = lastRecord.totalLiabilities;

    let capitalInvested = lastRecord.capitalInvested;
    let withdrawls = lastRecord.withdrawls;
    let personalExpense = lastRecord.personalExpense;
    let retainedEarning = lastRecord.retainedEarning;

    let equity = lastRecord.equity;
    let totalLiabilitiesAndEquity = totalLiabilities + equity;

    return {
      assets: {
        currentAssets: {
          cash,
          bank,
          receivable,
          inventory,
        },
        nonCurrentAssets: {
          fixedAsset,
          softwareDevelopment,
        },
      },
      liabilities: {
        currentLiabilities: {
          payable,
        },
        nonCurrentLiabilities: {
          loan,
        },
      },

      equity: {
        capitalInvested,
        withdrawls,
        personalExpense,
        retainedEarning,
      },

      totals: {
        totalCurrentAssets,
        totalNonCurrentAssets,
        totalAssets,
        totalCurrentLiabilities,
        totalNonCurrentLiabilities,
        totalLiabilities,
        totalEquity: equity,
        totalLiabilitiesAndEquity,
      },
    };
  } else {
    return {
      assets: {
        currentAssets: {},
        nonCurrentAssets: {},
      },

      liabilities: {
        currentLiabilities: {},
        nonCurrentLiabilities: {},
      },

      equity: {},

      totals: {
        totalCurrentAssets: 0,
        totalNonCurrentAssets: 0,
        totalAssets: 0,
        totalCurrentLiabilities: 0,
        totalNonCurrentLiabilities: 0,
        totalLiabilities: 0,
        totalEquity: 0,
        totalLiabilitiesAndEquity: 0,
      },
    };
  }
};

export const getCashFlowGettersService = async (startDate, endDate, user) => {
  let toRecord = await getBetweenDateRangeLastCumulativeRecord(
    startDate,
    endDate,
    user
  );
  let fromRecord = null;
  if (toRecord) {
    fromRecord = await getBeforeOrGivenDateLastCumulativeRecord(
      startDate,
      user
    );
    if (fromRecord == null) fromRecord = getNewCumulativeGetterModel(user);
  } else {
    toRecord = await getBeforeOrGivenDateLastCumulativeRecord(endDate, user);
    fromRecord = toRecord;
  }

  if (toRecord) {
    let startingBalance = toRecord.balance;
    let endingBalance = fromRecord.balance;

    let netProfit = toRecord.netProfit - fromRecord.netProfit;
    let depreciation = toRecord.depreciation - fromRecord.depreciation;
    let assetSaleGain = toRecord.assetSaleGain - fromRecord.assetSaleGain;
    let receivable = toRecord.receivable - fromRecord.receivable;
    let payable = toRecord.payable - fromRecord.payable;
    let inventory = toRecord.inventory - fromRecord.inventory;
    let totalOperatingActivity =
      netProfit +
      depreciation +
      assetSaleGain +
      receivable +
      payable +
      inventory;

    let capitalExpenditure =
      toRecord.fixedAsset +
      toRecord.softwareDevelopment -
      (fromRecord.fixedAsset + fromRecord.softwareDevelopment);
    let assetDisposal = toRecord.assetSale - fromRecord.assetSale;
    let totalInvestingActivity = capitalExpenditure - assetDisposal;

    let principalRepayment =
      toRecord.principalRepayment - fromRecord.principalRepayment;
    let loanReceived = toRecord.loanReceived - fromRecord.loanReceived;
    let capitalInvested = toRecord.capitalInvested - fromRecord.capitalInvested;
    let withdrawls = toRecord.withdrawls - fromRecord.withdrawls;
    let personalExpense = toRecord.personalExpense - fromRecord.personalExpense;
    let totalFinancingActivity =
      principalRepayment +
      loanReceived +
      capitalInvested +
      withdrawls +
      personalExpense;

    return {
      operating: {
        netProfit,
        depreciation,
        assetSaleGain,
        receivable,
        payable,
        inventory,
      },
      totalOperatingActivity,

      investing: {
        capitalExpenditure,
        assetDisposal,
      },
      totalInvestingActivity,

      financing: {
        principalRepayment,
        loanReceived,
        capitalInvested,
        withdrawls,
        personalExpense,
      },
      totalFinancingActivity,
      startingBalance,
      endingBalance,
    };
  } else {
    return {
      operating: {},
      totalOperatingActivity: 0,

      investing: {},
      totalInvestingActivity: 0,

      financing: {},
      totalFinancingActivity: 0,
      startingBalance: 0,
      endingBalance: 0,
    };
  }
};

const getTotalDays = async (user) => {
  console.log("getTotalDays");
  console.log(user);
  let date = new Date();
  date.setHours(5, 0, 0, 0);
  let firstTransaction = await transactionModel.findOne({
    $query: { companyId: user.companyId },
    $orderby: { _id: 1 },
  });
  let date1 = new Date(firstTransaction.createdAt);
  const diffTime = Math.abs(date - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const getNewCustomersInCurrentMonth = async (user) => {
  console.log("getNewCustomersInCurrentMonth");
  console.log(user);

  let date = new Date();
  date.setDate(1);
  date.setHours(5, 0, 0, 0);
  return await customerModel
    .find({ date: { $gte: date }, companyId: user.companyId })
    .count();
};

const getCurrentPeriodLastCumulativeRecord = async (date, period, user) => {
  console.log("getCurrentPeriodLastCumulativeRecord");
  console.log(user);

  let referenceDate = null;
  if (period === "week") {
    referenceDate = getLastMonday(date);
    console.log("here in week = " + referenceDate);
  } else if (period === "month") {
    referenceDate = new Date(date.getFullYear(), date.getMonth(), 1);
    console.log("here in month = " + referenceDate);
  } else if (period === "quarter") {
    referenceDate = getLastQuarter(date);
    console.log("here in quarter = " + referenceDate);
  }

  return await cumulativeGetterModel
    .findOne({ date: { $gte: referenceDate }, companyId: user.companyId })
    .sort({ date: -1 });
};

const getBetweenDateRangeLastCumulativeRecord = async (
  startDate,
  endDate,
  user
) => {
  console.log("getBetweenDateRangeLastCumulativeRecord");
  console.log(user);
  return await cumulativeGetterModel
    .findOne({
      $and: [
        { date: { $gt: startDate } },
        { date: { $lte: endDate } },
        { companyId: user.companyId },
      ],
    })
    .sort({ date: -1 });
};

const getBeforeOrGivenDateLastCumulativeRecord = async (
  referenceDate,
  user
) => {
  console.log("getBeforeOrGivenDateLastCumulativeRecord");
  console.log(user);
  return await cumulativeGetterModel
    .findOne({ date: { $lte: referenceDate }, companyId: user.companyId })
    .sort({ date: -1 });
};

const getPreviousPeriodLastCumulativeRecord = async (date, period, user) => {
  console.log("getPreviousPeriodLastCumulativeRecord");
  console.log(user);
  let referenceDate = null;
  if (period === "week") {
    referenceDate = getLastMonday(date);
  } else if (period === "month") {
    referenceDate = new Date(date.getFullYear(), date.getMonth(), 1, 5);
  } else if (period === "quarter") {
    referenceDate = getLastQuarter(date);
  }

  return await cumulativeGetterModel
    .findOne({ date: { $lt: referenceDate }, companyId: user.companyId })
    .sort({ date: -1 });
};

const getLastMonday = (date) => {
  date.setDate(date.getDate() - (date.getDay() == 0 ? 7 : date.getDay()));
  date.setDate(date.getDate() + 1); // adding 1 to last sunday to get last monday
  return date;
};

const getLastQuarter = (date) => {
  let prevQuarter = date.getMonth() / 3;
  if (prevQuarter < 1) {
    date.setMonth(0);
    return date.setDate(1);
  } else if (prevQuarter < 2) {
    date.setMonth(3);
    return date.setDate(1);
  } else if (prevQuarter < 3) {
    date.setMonth(6);
    return date.setDate(1);
  } else if (prevQuarter < 4) {
    date.setMonth(9);
    return date.setDate(1);
  }
};
