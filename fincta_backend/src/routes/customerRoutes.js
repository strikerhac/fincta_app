import express from "express";
import {
  getCustomerById,
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomerById,
} from "../controllers/customerController.js";

const router = express.Router();

router.get("/", getCustomers);
router.get("/:_id", getCustomerById);
router.post("/", createCustomer);
router.put("/", updateCustomer);
router.delete("/:_id", deleteCustomerById);

export default router;
