import mongoose from "mongoose";
const { Schema } = mongoose;

const loanSchema = new Schema({
  name: String,
  description: String,
  amount: mongoose.Number,
  installments: [],
  lenderId: String,
  userId: { type: String, required: true },
  companyId: { type: String, required: true },
  disable: Boolean,
});

const Loan = mongoose.model("Loan", loanSchema);
export default Loan;
