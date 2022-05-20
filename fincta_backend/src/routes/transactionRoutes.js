import express from "express";
import {
  getTransactionById,
  getTransactions,
  createTransaction,
  createInventorySaleTransaction,
  createInventoryPurchaseTransaction,
  createAssetSaleTransaction,
  updateTransaction,
  deleteTransactionById,
  getTransactionsByInventoryIds,
  getTransactionsByAssetIds,
  getReceivableTransactions,
  getPayableTransactions,
} from "../controllers/transactionController.js";

const router = express.Router();

router.get("/", getTransactions);
router.get("/receivables", getReceivableTransactions);
router.get("/payables", getPayableTransactions);
router.post("/byInventoryIds", getTransactionsByInventoryIds);
router.post("/byAssetIds", getTransactionsByAssetIds);
router.get("/:_id", getTransactionById);
router.post("/", createTransaction);
router.post("/inventorySale", createInventorySaleTransaction);
router.post("/assetSale", createAssetSaleTransaction);
router.post("/inventoryPurchase", createInventoryPurchaseTransaction);
router.put("/", updateTransaction);
router.delete("/:_id", deleteTransactionById);

export default router;
