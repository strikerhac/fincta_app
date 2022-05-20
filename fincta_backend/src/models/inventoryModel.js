import mongoose from "mongoose";
const { Schema } = mongoose;

const inventorySchema = new Schema({
  name: String,
  type: String,
  model: String,
  description: String,
  company: String,
  shelfLife: mongoose.Number,
  sku: String,
  quantity: mongoose.Number,
  amount: mongoose.Number,
  userId: { type: String, required: true },
  companyId: { type: String, required: true },
  disable: Boolean,
});

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
