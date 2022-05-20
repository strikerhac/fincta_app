import assetModel from "../models/assetModel.js";

export const getAssets = async (req, res) => {
  try {
    const assets = await assetModel.find({ companyId: req.user.companyId });
    res.status(200).json(assets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAssetById = async (req, res) => {
  const { _id } = req.params;
  try {
    const asset = await assetModel.findById({ _id });
    res.status(200).json(asset);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createAsset = async (req, res) => {
  const asset = req.body;
  const newAsset = new assetModel(asset);
  console.log(newAsset);
  try {
    await newAsset.save();
    res.status(201).json(newAsset);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateAsset = async (req, res) => {
  const asset = req.body;
  const newAsset = new assetModel(asset);
  newAsset.isNew = false;
  console.log(asset);
  try {
    await newAsset.save();
    res.status(201).json(newAsset);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteAssetById = async (req, res) => {
  const { _id } = req.params;
  try {
    const asset = await assetModel.updateOne(
      { _id },
      { $set: { disable: true } },
      { multi: true }
    );
    res.status(201).json(asset);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
