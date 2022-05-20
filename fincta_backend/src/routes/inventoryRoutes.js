import express from "express";
import {
  getInventoryById,
  getInventories,
  createInventory,
  updateInventory,
  deleteInventoryById,
} from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/", getInventories);
router.get("/:_id", getInventoryById);
router.post("/", createInventory);
router.put("/", updateInventory);
router.delete("/:_id", deleteInventoryById);

export default router;
