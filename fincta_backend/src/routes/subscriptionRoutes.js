import express from "express";
import {
  getSubscriptionById,
  getSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscriptionById,
} from "../controllers/subscriptionController.js";

const router = express.Router();

router.get("/", getSubscriptions);
router.get("/:_id", getSubscriptionById);
router.post("/", createSubscription);
router.put("/", updateSubscription);
router.delete("/:_id", deleteSubscriptionById);

export default router;
