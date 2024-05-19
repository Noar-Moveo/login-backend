import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, validateUser } from "../models/userModel";
import winston from "winston";

export const signup = async (userData: any) => {
  const { error } = validateUser(userData);
  if (error) {
    winston.error(`Validation failed: ${error.details[0].message}`);
    throw new Error(error.details[0].message);
  }

  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    winston.error("User already exists");
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 12);

  const newUser = new User({
    ...userData,
    password: hashedPassword,
  });

  const result = await newUser.save();

  const token = jwt.sign({ email: result.email, id: result._id }, "test", {
    expiresIn: "1h",
  });

  return { result, token };
};
