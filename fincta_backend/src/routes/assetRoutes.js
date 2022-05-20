import express from "express";
import {
  getAssetById,
  getAssets,
  createAsset,
  updateAsset,
  deleteAssetById,
} from "../controllers/assetController.js";

const router = express.Router();

router.get("/", getAssets);
router.get("/:_id", getAssetById);
router.post("/", createAsset);
router.put("/", updateAsset);
router.delete("/:_id", deleteAssetById);

export default router;
