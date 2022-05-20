import mongoose from "mongoose";
const { Schema } = mongoose;

const companySchema = new Schema({
  companyName: String,
  country: String,
  salesTax: Boolean,
  currency: String,
  disable: Boolean,
});

const Company = mongoose.model("Company", companySchema);
export default Company;
