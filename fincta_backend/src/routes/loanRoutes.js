import express from "express";
import {
  getLoanById,
  getLoans,
  createLoan,
  updateLoan,
  deleteLoanById,
} from "../controllers/loanController.js";

const router = express.Router();

router.get("/", getLoans);
router.get("/:_id", getLoanById);
router.post("/", createLoan);
router.put("/", updateLoan);
router.delete("/:_id", deleteLoanById);

export default router;
