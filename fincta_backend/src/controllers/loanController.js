import loanModel from "../models/loanModel.js";
import moment from "moment";

export const getLoans = async (req, res) => {
  try {
    const loans = await loanModel.find({ companyId: req.user.companyId });
    res.status(200).json(loans);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getLoanById = async (req, res) => {
  const { _id } = req.params;
  try {
    const loan = await loanModel.findById({ _id });
    res.status(200).json(loan);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createInstallments = (loan) => {
  let dates = [];
  dates = loan.installmentDates;
  const installments = [];
  dates.forEach((date, index) => {
    let dateTimeFromUnix = new Date(Math.round(date));
    let dateWithGMTTimeOnly = new Date(
      Date.UTC(
        dateTimeFromUnix.getUTCFullYear(),
        dateTimeFromUnix.getUTCMonth(),
        dateTimeFromUnix.getUTCDate()
      )
    );

    if (true) {
      let inst = `Installment No. ${index + 1}`;
      let dt = moment(dateWithGMTTimeOnly).format("YYYY-MM-DD");
      console.log(dt);
      installments.push({
        installment: inst,
        date: dt,
      });
    }
  });
  return installments;
};

export const createLoan = async (req, res) => {
  const loan = req.body;
  loan.installments = createInstallments(loan);
  delete loan.installmentDates;

  const newLoan = new loanModel(loan);
  console.log(newLoan);
  try {
    await newLoan.save();
    res.status(201).json(newLoan);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateLoan = async (req, res) => {
  const loan = req.body;
  const newLoan = new loanModel(loan);
  newLoan.isNew = false;
  console.log(loan);
  try {
    await newLoan.save();
    res.status(201).json(newLoan);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteLoanById = async (req, res) => {
  const { _id } = req.params;
  try {
    const loan = await loanModel.updateOne(
      { _id },
      { $set: { disable: true } },
      { multi: true }
    );
    res.status(201).json(loan);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
