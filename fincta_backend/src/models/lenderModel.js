import mongoose from "mongoose";
const { Schema } = mongoose;

const lenderSchema = new Schema({
  name: String,
  email: String,
  contactNumber: String,
  city: String,
  country: String,
  address: String,
  userId: { type: String, required: true },
  companyId: { type: String, required: true },
  disable: Boolean,
});

const Lender = mongoose.model("Lender", lenderSchema);
export default Lender;
