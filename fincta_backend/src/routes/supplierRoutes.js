import express from "express";
import {
  getSupplierById,
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplierById,
} from "../controllers/supplierController.js";

const router = express.Router();

router.get("/", getSuppliers);
router.get("/:_id", getSupplierById);
router.post("/", createSupplier);
router.put("/", updateSupplier);
router.delete("/:_id", deleteSupplierById);

export default router;
