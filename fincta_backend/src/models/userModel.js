import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  designation: String,
  email: String,
  password: String,
  companyId: String,
  loginType: String,
  permissions: String,
  resetPasswordToken: String,
  resetPasswordExpires: mongoose.Number,
  companyId: { type: String, required: true },
  disable: Boolean,
});

const User = mongoose.model("User", userSchema);
export default User;
