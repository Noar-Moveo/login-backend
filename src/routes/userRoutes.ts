import express from "express";
import { signup } from "../controllers/userController";
import { sendOtp, verifyOtp } from "../services/otpService";
import { Err } from "joi";

const router = express.Router();

router.post("/signup", signup);

export default router;
