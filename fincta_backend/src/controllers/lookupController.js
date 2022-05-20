import lookupModel from "../models/lookupModel.js";

export const getLookups = async (req, res) => {
  try {
    const lookups = await lookupModel.find({ companyId: req.user.companyId });
    res.status(200).json(lookups);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getLookupsBySubAccount = async (req, res) => {
  const { _subAccount } = req.params;
  try {
    const lookups = await lookupModel.find({
      subAccount: _subAccount,
      companyId: req.user.companyId,
    });
    res.status(200).json(lookups);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getLookupById = async (req, res) => {
  const { _id } = req.params;
  try {
    const lookup = await lookupModel.findById({ _id });
    res.status(200).json(lookup);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createLookup = async (req, res) => {
  const lookup = req.body;
  const newLookup = new lookupModel(lookup);
  console.log(newLookup);
  try {
    await newLookup.save();
    res.status(201).json(newLookup);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateLookup = async (req, res) => {
  const lookup = req.body;
  const newLookup = new lookupModel(lookup);
  newLookup.isNew = false;
  console.log(lookup);
  try {
    await newLookup.save();
    res.status(201).json(newLookup);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteLookupById = async (req, res) => {
  const { _id } = req.params;
  try {
    const lookup = await lookupModel.updateOne(
      { _id },
      { $set: { disable: true } },
      { multi: true }
    );
    res.status(201).json(lookup);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
