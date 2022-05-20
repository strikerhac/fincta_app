import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { memberEmailSender } from "../services/emailService.js";
import crypto from "crypto";

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({
      companyId: req.user.companyId,
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await userModel.findById({ _id });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const user = req.body;
  let userInDb = null;
  try {
    userInDb = await userModel.findOne({ email: user.email });
  } catch (error) {
    console.log(error);
  }
  if (userInDb) {
    res.status(200).json({ valid: false, msg: "email already exists." });
  } else if (user.password.length < 3) {
    res
      .status(200)
      .json({ valid: false, msg: "password length must be greater than 2" });
  } else {
    user.password = bcrypt.hashSync(user.password, 10);
    const newUser = new userModel(user);
    console.log(user);
    try {
      await newUser.save();
      res.status(201).json({ valid: true, newUser });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
};

export const updateUser = async (req, res) => {
  const user = req.body;
  const newUser = new userModel(user);
  newUser.isNew = false;
  console.log(user);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteUserById = async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await userModel.updateOne(
      { _id },
      { $set: { disable: true } },
      { multi: true }
    );
    res.status(201).json(user);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getUserFromToken = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(404).json({ msg: error });
    console.log(error);
  }
};

export const createMember = async (req, res) => {
  const user = req.body;
  let userInDb = null;
  try {
    userInDb = await userModel.findOne({ email: user.email });
  } catch (error) {
    console.log(error);
  }
  if (userInDb) {
    res.status(200).json({ valid: false, msg: "email already exists." });
  } else {
    const token = crypto.randomBytes(20).toString("hex");
    user.loginType = "default";
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    const newUser = new userModel(user);
    console.log(user);
    try {
      await newUser.save();
      memberEmailSender(newUser);
      res.status(201).json({ valid: true, newUser });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
};
