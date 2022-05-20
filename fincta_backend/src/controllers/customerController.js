import customerModel from "../models/customerModel.js";

export const getCustomers = async (req, res) => {
  try {
    const customers = await customerModel.find({
      companyId: req.user.companyId,
    });
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomerById = async (req, res) => {
  const { _id } = req.params;
  try {
    const customer = await customerModel.findById({ _id });
    res.status(200).json(customer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCustomer = async (req, res) => {
  const customer = req.body;
  const newCustomer = new customerModel(customer);
  newCustomer.active = false;
  console.log(newCustomer);
  try {
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  const customer = req.body;
  const newCustomer = new customerModel(customer);
  newCustomer.isNew = false;
  console.log(customer);
  try {
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteCustomerById = async (req, res) => {
  const { _id } = req.params;
  try {
    const customer = await customerModel.updateOne(
      { _id },
      { $set: { disable: true } },
      { multi: true }
    );
    res.status(201).json(customer);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
