import employeeModel from "../models/employeeModel.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await employeeModel.find({
      companyId: req.user.companyId,
    });
    res.status(200).json(employees);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  const { _id } = req.params;
  try {
    const employee = await employeeModel.findById({ _id });
    res.status(200).json(employee);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createEmployee = async (req, res) => {
  const employee = req.body;
  const newEmployee = new employeeModel(employee);
  console.log(newEmployee);
  try {
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  const employee = req.body;
  const newEmployee = new employeeModel(employee);
  newEmployee.isNew = false;
  console.log(employee);
  try {
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteEmployeeById = async (req, res) => {
  const { _id } = req.params;
  try {
    const employee = await employeeModel.updateOne(
      { _id },
      { $set: { disable: true } },
      { multi: true }
    );
    res.status(201).json(employee);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
