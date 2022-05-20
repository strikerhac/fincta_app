import mongoose from "mongoose";
const { Schema } = mongoose;

const cumulativeGetterSchema = new Schema({
  date: Date,
  inflow: mongoose.Number,
  outflow: mongoose.Number,
  cash: mongoose.Number,
  bank: mongoose.Number,
  balance: mongoose.Number,
  productSales: mongoose.Number,
  subscription: mongoose.Number,
  services: mongoose.Number,
  sales: mongoose.Number,
  cogs: mongoose.Number,
  assetSale: mongoose.Number,
  assetSaleGain: mongoose.Number,
  rentReceived: mongoose.Number,
  miscellaneousIncome: mongoose.Number,
  otherIncome: mongoose.Number,

  adsAndMarketing: mongoose.Number,
  salaries: mongoose.Number,
  adminExpenses: mongoose.Number,
  utilityExpense: mongoose.Number,
  miscellaneousExpense: mongoose.Number,
  financeCost: mongoose.Number,
  researchAndDevelopment: mongoose.Number,
  rentPayment: mongoose.Number,
  depreciation: mongoose.Number,
  businessEntertainment: mongoose.Number,
  otherExpense: mongoose.Number,

  netProfit: mongoose.Number,
  inventory: mongoose.Number,
  totalCummulativeInventory: mongoose.Number,
  receivable: mongoose.Number,
  fixedAsset: mongoose.Number,
  softwareDevelopment: mongoose.Number,
  totalAssets: mongoose.Number,

  payable: mongoose.Number,
  loan: mongoose.Number,
  loanReceived: mongoose.Number,
  principalRepayment: mongoose.Number,
  totalLiabilities: mongoose.Number,
  capitalExpenditure: mongoose.Number,
  capitalInvested: mongoose.Number,
  withdrawls: mongoose.Number,
  personalExpense: mongoose.Number,
  retainedEarning: mongoose.Number,
  equity: mongoose.Number,

  userId: { type: String, required: true },
  companyId: { type: String, required: true },
  disable: Boolean,
});

const CumulativeGetter = mongoose.model(
  "CumulativeGetter",
  cumulativeGetterSchema
);
export default CumulativeGetter;
