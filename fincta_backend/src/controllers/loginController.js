import userModel from "../models/userModel.js";
import companyModel from "../models/companyModel.js";
import { memberEmailSender } from "../services/emailService.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const loginUser = async (req, res) => {
  let user = req.body;
  let userInDb = null;
  try {
    userInDb = await userModel.findOne({ email: user.email });
  } catch (error) {
    console.log(error);
  }
  if (userInDb) {
    let company = await companyModel.findOne({ _id: userInDb.companyId });
    const token = jwt.sign({ user: userInDb }, "jwtSecret", {});
    console.log(userInDb.password);
    if (userInDb.loginType === "default") {
      if (comparePassword(user.password, userInDb.password)) {
        res
          .status(201)
          .json({ valid: true, auth: true, token, userInDb, company });
      } else res.status(200).json({ valid: false, msg: "incorrect password" });
    } else {
      console.log("mama jiiiiii");
      console.log(user);
      if (user.password === null) {
        res
          .status(201)
          .json({ valid: true, auth: true, token, userInDb, company });
      } else {
        let msg = `this user is registered with ${userInDb.loginType} login`;
        console.log(msg);
        res.status(200).json({ valid: false, msg });
      }
    }
  } else {
    res.status(200).json({ valid: false, msg: "email does not exists." });
  }
};

export const registerUser = async (req, res) => {
  let { action, user, company } = req.body;

  if (action === "verifyUser") {
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
    } else res.status(200).json({ valid: true });
  } else if (action === "registerUserAndCompany") {
    let companyInDb = null;
    try {
      companyInDb = await companyModel.findOne({
        companyName: company.companyName,
      });
    } catch (error) {
      console.log(error);
    }

    if (companyInDb) {
      res
        .status(200)
        .json({ valid: false, msg: "company with this name already exists." });
    } else {
      if (user.loginType === "default") {
        user.password = encrypt(user.password);
      } else {
        user.password = null;
      }
      const newCompany = new companyModel(company);

      try {
        let newCompanyDocument = await newCompany.save();
        user.companyId = newCompanyDocument._id;
        user.permissions = "admin";
        const newUser = new userModel(user);
        let newUserDocument = await newUser.save();
        if (newUserDocument)
          res
            .status(201)
            .json({ valid: true, auth: true, user: newUserDocument });
      } catch (error) {
        res.status(409).json({ message: error.message });
        console.log(error);
      }
    }
  }
};

export const socialAuth = async (req, res) => {
  console.log("request => ");
  console.log(req.user);

  let user = req.user;
  let userInDb = null;
  try {
    userInDb = await userModel.findOne({
      email: user.email,
      loginType: "google",
    });
  } catch (error) {
    console.log(error);
  }
  if (userInDb) {
    const id = userInDb._id;
    let company = await companyModel.findOne({ _id: userInDb.companyId });
    const token = jwt.sign({ id }, "jwtSecret", {});
    res.status(201).json({ valid: true, auth: true, token, userInDb, company });
  } else {
    res.status(200).json({ valid: true, user });
  }
};

export const checkEmailValidity = async (req, res) => {
  const { resetPasswordToken } = req.params;
  userModel
    .findOne({
      resetPasswordToken,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    })
    .then((user) => {
      if (user == null) {
        console.error("password reset link is invalid or has expired");
        res.status(200).send({
          valid: false,
          msg: "password reset link is invalid or has expired",
        });
      } else {
        res.status(200).send({
          valid: true,
          email: user.email,
          msg: "password reset link a-ok",
        });
      }
    });
};

export const updatePasswordViaEmail = (req, res) => {
  userModel
    .findOne({
      email: req.body.email,
      resetPasswordToken: req.body.resetPasswordToken,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    })
    .then((user) => {
      if (user == null) {
        console.error("password reset link is invalid or has expired.");
        res.status(403).send({
          valid: false,
          msg: "password reset link is invalid or has expired.",
        });
      } else if (user != null) {
        console.log("user exists in db");
        user.password = encrypt(req.body.password);
        if (updateUser(user)) {
          console.log("password updated");
          res.status(200).send({ valid: true, msg: "password updated." });
        }
      } else {
        console.error("no user exists in db to update");
        res
          .status(401)
          .json({ valid: false, msg: "no user exists in db to update." });
      }
    });
};

export const forgotPasswordUpdate = async (req, res) => {
  const user = req.body;
  let userInDb = null;
  try {
    userInDb = await userModel.findOne({ email: user.email });
  } catch (error) {
    console.log(error);
  }
  if (!userInDb) {
    res.status(200).json({ valid: false, msg: "email does not exists." });
  } else {
    const token = crypto.randomBytes(20).toString("hex");
    userInDb.resetPasswordToken = token;
    userInDb.resetPasswordExpires = Date.now() + 3600000;
    if (updateUser(userInDb)) {
      console.log(userInDb);
      try {
        memberEmailSender(userInDb);
        res
          .status(201)
          .json({ valid: true, msg: "reset link is sent to your email." });
      } catch (error) {
        res.status(409).json({ message: error.message });
      }
    }
  }
};

const comparePassword = (passwordEntered, encrypted) => {
  return bcrypt.compareSync(passwordEntered, encrypted);
};

const encrypt = (password) => {
  return bcrypt.hashSync(password, 10);
};

const updateUser = async (user) => {
  const newUser = new userModel(user);
  newUser.isNew = false;
  console.log(user);
  try {
    await newUser.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
