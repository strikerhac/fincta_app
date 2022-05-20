import express from "express";
import {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  deleteUserById,
  getUserFromToken,
  createMember,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/fromtoken", getUserFromToken);
router.get("/:_id", getUserById);
router.post("/", createUser);
router.post("/member", createMember);
router.put("/", updateUser);
router.delete("/:_id", deleteUserById);

export default router;
