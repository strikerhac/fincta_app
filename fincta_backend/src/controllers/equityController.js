import equityModel from "../models/equityModel.js";

export const getEquities = async (req, res) => {
  try {
    const equities = await equityModel.find({ companyId: req.user.companyId });
    res.status(200).json(equities);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getEquityById = async (req, res) => {
  const { _id } = req.params;
  try {
    const equity = await equityModel.findById({ _id });
    res.status(200).json(equity);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createEquity = async (req, res) => {
  const equity = req.body;
  const newEquity = new equityModel(equity);
  console.log(newEquity);
  try {
    await newEquity.save();
    res.status(201).json(newEquity);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateEquity = async (req, res) => {
  const equity = req.body;
  const newEquity = new equityModel(equity);
  newEquity.isNew = false;
  console.log(equity);
  try {
    await newEquity.save();
    res.status(201).json(newEquity);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteEquityById = async (req, res) => {
  const { _id } = req.params;
  try {
    const equity = await equityModel.updateOne(
      { _id },
      { $set: { disable: true } },
      { multi: true }
    );
    res.status(201).json(equity);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
