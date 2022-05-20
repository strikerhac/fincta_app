import express from "express";
import {
  loginUser,
  registerUser,
  socialAuth,
  checkEmailValidity,
  updatePasswordViaEmail,
  forgotPasswordUpdate,
} from "../controllers/loginController.js";
import passport from "passport";

const router = express.Router();

router.post("/", loginUser);
router.post("/register", registerUser);

router.get("/auth/google", (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next);
});

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/signin" }),
  socialAuth
);
router.post("/forgotpassword", forgotPasswordUpdate);

router.get("/checkemailvalidity/:resetPasswordToken", checkEmailValidity);

router.put("/updatepasswordviaemail", updatePasswordViaEmail);

export default router;
