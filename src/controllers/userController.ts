import { Request, Response } from "express";
import * as userHandler from "../handlers/userHandler";
import {
  sendOtp as sendOtpService,
  verifyOtp as verifyOtpService,
} from "../services/otpService";

export const signup = async (req: Request, res: Response) => {
  try {
    const result = await userHandler.signup(req.body);
    res.status(201).json(result);
    // const { phoneNumber } = req.body;
    // const otp = await sendOtpService(phoneNumber);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: error.message });
      //   console.error("Error sending OTP:", error);
      //   res.status(500).json({ message: error.message });
    } else {
      console.error("Signup error:", error);
      res.status(500).json({ message: "An unknown error occurred." });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await userHandler.login(
      req.body as { email: string; password: string }
    );
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
    }
  }
};
