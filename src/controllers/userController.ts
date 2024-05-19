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
