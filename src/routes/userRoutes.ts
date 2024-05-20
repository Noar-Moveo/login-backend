import express from "express";
import { signup } from "../controllers/userController";

const router = express.Router();

// Route for user signup
router.post("/signup", signup);

export default router;
