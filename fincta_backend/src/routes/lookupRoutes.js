import express from "express";
import {
  getLookupById,
  getLookupsBySubAccount,
  getLookups,
  createLookup,
  updateLookup,
  deleteLookupById,
} from "../controllers/lookupController.js";

const router = express.Router();
router.get("/", getLookups);
router.get("/:_id", getLookupById);
router.get("/name/:_subAccount", getLookupsBySubAccount);
router.post("/", createLookup);
router.put("/", updateLookup);
router.delete("/:_id", deleteLookupById);

export default router;
