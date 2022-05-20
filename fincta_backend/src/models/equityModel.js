import mongoose from "mongoose";

const equitySchema = mongoose.Schema({
  beginningEquity: mongoose.Number,
  profitAndLoss: mongoose.Number,
  withdrawl: mongoose.Number,
  userId: { type: String, required: true },
  companyId: { type: String, required: true },
  disable: Boolean,
});

const Equity = mongoose.model("Equity", equitySchema);
export default Equity;
