import express from "express";
import { signup, login } from "../controllers/userController";
import { Request, Response } from "express";

const router = express.Router();

// Route for user signup
router.post("/signup", signup);
router.post("/login", login);

router.get("/", async (Request: Request, Response: Response) => {
  Response.send({
    message: "Hello World",
  });
});

export default router;
