import inventoryModel from "../models/inventoryModel.js";

export const getInventories = async (req, res) => {
  try {
    const inventories = await inventoryModel.find({
      companyId: req.user.companyId,
    });
    res.status(200).json(inventories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getInventoryById = async (req, res) => {
  const { _id } = req.params;
  try {
    const inventory = await inventoryModel.findById({ _id });
    res.status(200).json(inventory);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createInventory = async (req, res) => {
  const inventory = req.body;
  const newInventory = new inventoryModel(inventory);
  console.log(newInventory);
  try {
    await newInventory.save();
    res.status(201).json(newInventory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateInventory = async (req, res) => {
  const inventory = req.body;
  const newInventory = new inventoryModel(inventory);
  newInventory.isNew = false;
  console.log(inventory);
  try {
    await newInventory.save();
    res.status(201).json(newInventory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteInventoryById = async (req, res) => {
  const { _id } = req.params;
  try {
    const inventory = await inventoryModel.updateOne(
      { _id },
      { $set: { disable: true } },
      { multi: true }
    );
    res.status(201).json(inventory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
