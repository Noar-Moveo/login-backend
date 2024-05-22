import express from "express";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/userController";
import { User, validateUser } from "../models/userModel";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.post("/check-email", async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(200).json({ exists: true });
  } else {
    return res.status(200).json({ exists: false });
  }
});

export default router;
