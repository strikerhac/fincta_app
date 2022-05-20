import mongoose from "mongoose";
const { Schema } = mongoose;

const transactionSchema = new Schema({
  accountClass: String,
  subAccount: String,
  createdAt: Date,
  description: String,
  debit: mongoose.Number,
  credit: mongoose.Number,
  receivable: mongoose.Number,
  payable: mongoose.Number,
  principal: mongoose.Number,
  interest: mongoose.Number,
  receipt: String,
  cash: mongoose.Number,
  bank: mongoose.Number,
  purchaseQuantity: mongoose.Number,
  assetSaleGain: mongoose.Number,
  remainingAssetValue: mongoose.Number,
  //soldQuantity contains the quantity of inventory that is sold in th same purchase transaction.
  soldQuantity: mongoose.Number,
  saleQuantity: mongoose.Number,
  depreciation: mongoose.Number,
  cogs: mongoose.Number,
  perUnit: mongoose.Number,
  withdrawl: mongoose.Number,
  profitLoss: mongoose.Number,
  receivableFlag: mongoose.Number,
  payableFlag: mongoose.Number,
  loanFlag: mongoose.Number,
  equityId: String,
  assetId: String,
  inventoryId: String,
  employeeId: String,
  supplierId: String,
  customerId: String,
  subscriptionId: String,
  loanId: String,
  lenderId: String,
  lookupId: String,
  receivableId: String,
  payableId: String,

  userId: { type: String, required: true },
  companyId: { type: String, required: true },
  disable: Boolean,
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
