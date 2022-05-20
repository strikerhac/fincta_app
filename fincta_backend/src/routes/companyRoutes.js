import express from "express";
import {
  getCompanyById,
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompanyById,
} from "../controllers/companyController.js";

const router = express.Router();

router.get("/", getCompanies);
router.get("/:_id", getCompanyById);
router.post("/", createCompany);
router.put("/", updateCompany);
router.delete("/:_id", deleteCompanyById);

export default router;
