import supplierModel from "../models/supplierModel.js";

export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await supplierModel.find({
      companyId: req.user.companyId,
    });
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSupplierById = async (req, res) => {
  const { _id } = req.params;
  try {
    const supplier = await supplierModel.findById({ _id });
    res.status(200).json(supplier);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createSupplier = async (req, res) => {
  const supplier = req.body;
  const newSupplier = new supplierModel(supplier);
  console.log(newSupplier);
  try {
    await newSupplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateSupplier = async (req, res) => {
  const supplier = req.body;
  const newSupplier = new supplierModel(supplier);
  newSupplier.isNew = false;
  console.log(supplier);
  try {
    await newSupplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteSupplierById = async (req, res) => {
  const { _id } = req.params;
  try {
    const supplier = await supplierModel.updateOne(
      { _id },
      { $set: { disable: true } },
      { multi: true }
    );
    res.status(201).json(supplier);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
