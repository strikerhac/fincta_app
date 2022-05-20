import express from "express";
import {
  getEmployeeById,
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployeeById,
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", getEmployees);
router.get("/:_id", getEmployeeById);
router.post("/", createEmployee);
router.put("/", updateEmployee);
router.delete("/:_id", deleteEmployeeById);

export default router;
