import transactionModel from "../models/transactionModel.js";
import customerModel from "../models/customerModel.js";
import supplierModel from "../models/supplierModel.js";
import {
  createInventoryPurchaseTransactionService,
  createInventorySaleTransactionService,
  createAssetSaleTransactionService,
  createGettersDataService,
} from "../services/transactionService.js";

export const getTransactions = async (req, res) => {
  try {
    const transactions = await transactionModel.find({
      companyId: req.user.companyId,
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransactionById = async (req, res) => {
  const { _id } = req.params;
  try {
    const transaction = await transactionModel.findById({ _id });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const activateEntities = async (transaction) => {
  console.log("activateEntities");
  console.log(transaction);

  if (transaction.customerId) {
    let id = transaction.customerId;
    try {
      let customer = await customerModel.findById(id);
      if (customer) {
        if (!customer.active) {
          let date = new Date();
          date.setHours(5, 0, 0, 0);
          customer.active = true;
          customer.activationDate = date;
          customer.isNew = false;
          await customer.save();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (transaction.supplierId) {
    let id = transaction.supplierId;
    try {
      let supplier = await supplierModel.findById(id);
      if (supplier) {
        if (!supplier.active) {
          console.log(supplier);
          let date = new Date();
          date.setHours(5, 0, 0, 0);
          supplier.active = true;
          supplier.activationDate = date;
          supplier.isNew = false;
          await supplier.save();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const createTransaction = async (req, res) => {
  const transaction = req.body;
  let newTransaction = new transactionModel(transaction);
  try {
    await newTransaction.save();
    await activateEntities(newTransaction);
    await createGettersDataService(newTransaction, req.user);
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const createAssetSaleTransaction = async (req, res) => {
  const transaction = req.body;
  try {
    let newTransaction = await createAssetSaleTransactionService(
      transaction,
      req.user
    );
    await activateEntities(newTransaction);
    await createGettersDataService(newTransaction, req.user);
    res.status(201).json(newTransaction);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

export const createInventoryPurchaseTransaction = async (req, res) => {
  const transaction = req.body;
  try {
    let newTransaction = await createInventoryPurchaseTransactionService(
      transaction,
      req.user
    );
    await activateEntities(newTransaction);
    await createGettersDataService(newTransaction, req.user);
    res.status(201).json(newTransaction);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

// for sale purpose in fifo fashion
export const createInventorySaleTransaction = async (req, res) => {
  const saleTransaction = req.body;
  try {
    let newTransaction = await createInventorySaleTransactionService(
      saleTransaction,
      req.user
    );
    await activateEntities(newTransaction);
    await createGettersDataService(newTransaction, req.user);
    res.status(201).json(newTransaction);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  const transaction = req.body;
  const newTransaction = new transactionModel(transaction);
  newTransaction.isNew = false;
  try {
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteTransactionById = async (req, res) => {
  const { _id } = req.params;
  try {
    const transaction = await transactionModel.updateOne(
      { _id },
      { $set: { disable: true } },
      { multi: true }
    );
    res.status(201).json(transaction);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getTransactionsByInventoryIds = async (req, res) => {
  const { inventoryIds } = req.body;
  try {
    const transactions = await transactionModel
      .find()
      .where("inventoryId")
      .in(inventoryIds)
      .exec();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransactionsByAssetIds = async (req, res) => {
  const { assetIds } = req.body;
  try {
    const transaction = await transactionModel
      .find()
      .where("assetId")
      .in(assetIds)
      .exec();
    res.status(200).json(transaction);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getReceivableTransactions = async (req, res) => {
  try {
    const transactions = await transactionModel.find({
      receivableFlag: 1,
      companyId: req.user.companyId,
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPayableTransactions = async (req, res) => {
  try {
    const transactions = await transactionModel.find({
      payableFlag: 1,
      companyId: req.user.companyId,
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
