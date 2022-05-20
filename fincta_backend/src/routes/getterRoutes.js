import express from "express";
import {
  getDashBoard,
  getPerformanceTracker,
  getIncomeStatement,
  getBalanceSheet,
  getCashFlowStatement,
} from "../controllers/getterController.js";

const router = express.Router();

router.get("/dashboard/:period", getDashBoard);
router.get("/performance", getPerformanceTracker);
router.get("/balanceSheet/:date", getBalanceSheet);
router.get("/incomeStatement/:startDate/:endDate", getIncomeStatement);
router.get("/cashFlowStatement/:startDate/:endDate", getCashFlowStatement);

export default router;
