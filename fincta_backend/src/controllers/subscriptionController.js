import subscriptionModel from "../models/subscriptionModel.js";

export const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await subscriptionModel.find({
      companyId: req.user.companyId,
    });
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSubscriptionById = async (req, res) => {
  const { _id } = req.params;
  try {
    const subscription = await subscriptionModel.findById({ _id });
    res.status(200).json(subscription);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createSubscription = async (req, res) => {
  const subscription = req.body;
  const newSubscription = new subscriptionModel(subscription);
  console.log(newSubscription);
  try {
    await newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateSubscription = async (req, res) => {
  const subscription = req.body;
  const newSubscription = new subscriptionModel(subscription);
  newSubscription.isNew = false;
  console.log(subscription);
  try {
    await newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteSubscriptionById = async (req, res) => {
  const { _id } = req.params;
  try {
    const subscription = await subscriptionModel.updateOne(
      { _id },
      { $set: { disable: true } },
      { multi: true }
    );
    res.status(201).json(subscription);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
