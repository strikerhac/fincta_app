import mongoose from "mongoose";
const { Schema } = mongoose;

const LookupSchema = new Schema({
  name: String,
  accountClass: String,
  subAccount: String,
  userId: { type: String, required: true },
  companyId: { type: String, required: true },
  disable: Boolean,
});

const Lookup = mongoose.model("Lookup", LookupSchema);
export default Lookup;
