import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, validateUser } from "../models/userModel";
import winston from "winston";
interface UserData {
  email: string;
  password: string;
}

const JWT_SECRET = "MYSECRECTKEY";

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

  // const token = jwt.sign({ email: result.email, id: result._id }, "test", {
  //   expiresIn: "1h",
  // });

  //return { result, token };
  return { result };
};

export const login = async (userData: UserData) => {
  const { email, password } = userData;
  if (!email || !password) {
    throw new Error("הכנס אימייל וסיסמה");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("אין חשבון קיים לכתובת מייל זו");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("מייל או סיסמה לא תקינים");
  }

  const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { result: user, token };
};
