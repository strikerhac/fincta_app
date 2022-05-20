import {
  getDashboardGettersService,
  getPerformanceTrackerGettersService,
  getIncomStatementGettersService,
  getBalanceSheetGettersService,
  getCashFlowGettersService,
} from "../services/getterService.js";

export const getDashBoard = async (req, res) => {
  const { period } = req.params;
  try {
    const dashBoardData = await getDashboardGettersService(period, req.user);
    res.status(200).json(dashBoardData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPerformanceTracker = async (req, res) => {
  try {
    const performanceTrackerData = await getPerformanceTrackerGettersService(
      "month",
      req.user
    );
    res.status(200).json(performanceTrackerData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getIncomeStatement = async (req, res) => {
  const { startDate, endDate } = req.params;
  try {
    const incomStatementData = await getIncomStatementGettersService(
      startDate,
      endDate,
      req.user
    );
    res.status(200).json(incomStatementData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBalanceSheet = async (req, res) => {
  const { date } = req.params;
  try {
    const balanceSheetData = await getBalanceSheetGettersService(
      date,
      req.user
    );
    res.status(200).json(balanceSheetData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getCashFlowStatement = async (req, res) => {
  const { startDate, endDate } = req.params;
  try {
    const cashFlowStatementData = await getCashFlowGettersService(
      startDate,
      endDate,
      req.user
    );
    res.status(200).json(cashFlowStatementData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
