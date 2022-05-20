import mongoose from "mongoose";
const { Schema } = mongoose;

const SubscriptionSchema = new Schema({
  name: String,
  startingDate: Date,
  endingDate: Date,
  periodDuration: mongoose.Number,
  amountPerPeriod: mongoose.Number,
  description: String,
  userId: { type: String, required: true },
  companyId: { type: String, required: true },
  disable: Boolean,
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);
export default Subscription;
