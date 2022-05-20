import express from "express";
import {
  getEquityById,
  getEquities,
  createEquity,
  updateEquity,
  deleteEquityById,
} from "../controllers/equityController.js";

const router = express.Router();

router.get("/", getEquities);
router.get("/:_id", getEquityById);
router.post("/", createEquity);
router.put("/", updateEquity);
router.delete("/:_id", deleteEquityById);

export default router;
