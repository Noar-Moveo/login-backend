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

// export const verifyOtp = async (req: Request, res: Response) => {
//   try {
//     const { sentOtp, receivedOtp } = req.body;
//     const isValid = verifyOtpService(sentOtp, receivedOtp);
//     if (isValid) {
//       res.status(200).json({ message: "OTP verified successfully" });
//     } else {
//       res.status(400).json({ message: "Invalid OTP" });
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Error verifying OTP:", error);
//       res.status(500).json({ message: error.message });
//     } else {
//       console.error("Unknown error verifying OTP:", error);
//       res.status(500).json({ message: "An unknown error occurred." });
//     }
//   }
// };
