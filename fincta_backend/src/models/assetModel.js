import mongoose from "mongoose";
const { Schema } = mongoose;

const assetSchema = new Schema({
  name: String,
  type: String,
  usefulLife: mongoose.Number,
  description: String,
  identificationNumber: String,
  perishable: Boolean,
  movable: Boolean,
  used: Boolean,
  purchasingCost: mongoose.Number,
  accumulatedDepreciation: mongoose.Number,
  userId: { type: String, required: true },
  companyId: { type: String, required: true },
  disable: Boolean,
});

const Asset = mongoose.model("Asset", assetSchema);
export default Asset;
