import lenderModel from "../models/lenderModel.js";

export const getLenders = async (req, res) => {
  try {
    const lenders = await lenderModel.find({ companyId: req.user.companyId });
    res.status(200).json(lenders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getLenderById = async (req, res) => {
  const { _id } = req.params;
  try {
    const lender = await lenderModel.findById({ _id });
    res.status(200).json(lender);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createLender = async (req, res) => {
  const lender = req.body;
  const newLender = new lenderModel(lender);
  console.log(newLender);
  try {
    await newLender.save();
    res.status(201).json(newLender);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateLender = async (req, res) => {
  const lender = req.body;
  const newLender = new lenderModel(lender);
  newLender.isNew = false;
  console.log(lender);
  try {
    await newLender.save();
    res.status(201).json(newLender);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteLenderById = async (req, res) => {
  const { _id } = req.params;
  try {
    const lender = await lenderModel.updateOne(
      { _id },
      { $set: { disable: true } },
      { multi: true }
    );
    res.status(201).json(lender);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
