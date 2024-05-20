import express from "express";
import { signup } from "../controllers/userController";
import { Request, Response } from "express";

const router = express.Router();

// Route for user signup
router.post("/signup", signup);

router.get("/", async (Request: Request, Response: Response) => {
  Response.send({
    message: "Hello World",
  });
});

export default router;
