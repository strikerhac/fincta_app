import mongoose from "mongoose";
const { Schema } = mongoose;

const employeeSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  contactNumber: String,
  department: String,
  city: String,
  country: String,
  address: String,
  userId: { type: String, required: true },
  companyId: { type: String, required: true },
  disable: Boolean,
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
