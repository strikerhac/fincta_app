import companyModel from "../models/companyModel.js";

export const getCompanies = async (req, res) => {
  try {
    const company = await companyModel.find();
    res.status(200).json(company);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCompanyById = async (req, res) => {
  const { _id } = req.params;
  try {
    const company = await companyModel.findById({ _id });
    res.status(200).json(company);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCompany = async (req, res) => {
  const company = req.body;
  const newCompany = new companyModel(company);
  console.log(newCompany);
  try {
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateCompany = async (req, res) => {
  const company = req.body;
  const newCompany = new companyModel(company);
  newCompany.isNew = false;
  console.log(company);
  try {
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteCompanyById = async (req, res) => {
  const { _id } = req.params;
  try {
    const company = await companyModel.updateOne(
      { _id },
      { $set: { disable: true } },
      { multi: true }
    );
    res.status(201).json(company);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
