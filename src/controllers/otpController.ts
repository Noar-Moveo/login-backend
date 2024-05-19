import { Request, Response } from "express";
import * as otpService from "../services/otpService";

export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { to, channel, locale } = req.body;
    const verification = await otpService.sendOtp(to, channel, locale);
    res.status(200).json({ success: true, sid: verification.sid });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res
        .status(500)
        .json({ success: false, message: "An unknown error occurred." });
    }
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { to, code } = req.body;
    const verificationCheck = await otpService.verifyOtp(to, code);
    if (verificationCheck.status === "approved") {
      res.status(200).json({ success: true, message: "Verification success." });
    } else {
      res.status(400).json({ success: false, message: "Incorrect token." });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res
        .status(500)
        .json({ success: false, message: "An unknown error occurred." });
    }
  }
};
