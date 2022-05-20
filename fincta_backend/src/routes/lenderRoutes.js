import express from "express";
import {
  getLenderById,
  getLenders,
  createLender,
  updateLender,
  deleteLenderById,
} from "../controllers/lenderController.js";

const router = express.Router();

router.get("/", getLenders);
router.get("/:_id", getLenderById);
router.post("/", createLender);
router.put("/", updateLender);
router.delete("/:_id", deleteLenderById);

export default router;
