import { Request, Response } from "express";
import {
  sendOtp as sendOtpService,
  verifyOtp as verifyOtpService,
} from "../services/otpService";

export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body;
    console.log(phoneNumber);

    const otp = await sendOtpService(phoneNumber);
    res.status(200).json({ message: "OTP sent successfully", otp });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ message: error.message });
    } else {
      console.error("Unknown error sending OTP:", error);
      res.status(500).json({ message: "An unknown error occurred." });
    }
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, receivedOtp } = req.body;
    const isValid = verifyOtpService(phoneNumber, receivedOtp);
    if (isValid) {
      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ message: error.message });
    } else {
      console.error("Unknown error verifying OTP:", error);
      res.status(500).json({ message: "An unknown error occurred." });
    }
  }
};
