import { Request, Response } from "express";
import * as userHandler from "../handlers/userHandler";

export const signup = async (req: Request, res: Response) => {
  try {
    const result = await userHandler.signup(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: error.message });
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

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    await userHandler.sendResetLink(email);
    res
      .status(200)
      .json({ message: "Password reset link sent to your email." });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Failed to send reset link. Please try again." });
    }
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  try {
    await userHandler.updatePassword(token, newPassword);
    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Failed to update password. Please try again." });
    }
  }
};
