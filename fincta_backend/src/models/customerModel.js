import mongoose from "mongoose";
const { Schema } = mongoose;

const customerSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  contactNumber: String,
  city: String,
  country: String,
  postalCode: String,
  address: String,
  active: Boolean,
  activationDate: Date,
  userId: { type: String, required: true },
  companyId: { type: String, required: true },
  disable: Boolean,
});

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
