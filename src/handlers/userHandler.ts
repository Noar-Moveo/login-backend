import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, validateUser } from "../models/userModel";
import winston from "winston";
import nodemailer from "nodemailer";
import sendEmail from "../sendEmail";

const JWT_SECRET = "MYSECRECTKEY";
const RESET_PASSWORD_SECRET = "MYRESETSECRETKEY";

interface UserData {
  email: string;
  password: string;
}

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

export const sendResetLink = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("אין חשבון קיים לכתובת מייל זו");
  }

  const token = jwt.sign(
    { email: user.email, id: user._id },
    RESET_PASSWORD_SECRET,
    {
      expiresIn: "1h",
    }
  );

  //const resetLink = `http://localhost:5174/reset-password?token=${token}`;
  const resetLink = `http://13.48.136.194/reset-password?token=${token}`;
  const subject = "Password Reset";
  const text = `Please use the following link to reset your password: ${resetLink}`;

  await sendEmail(user.email, subject, text);
};

export const updatePassword = async (token: string, newPassword: string) => {
  let decoded;
  try {
    decoded = jwt.verify(token, RESET_PASSWORD_SECRET) as { id: string };
  } catch (error) {
    throw new Error("Invalid or expired token");
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new Error("User not found");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  user.password = hashedPassword;
  await user.save();
};

// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { User, validateUser } from "../models/userModel";
// import winston from "winston";
// interface UserData {
//   email: string;
//   password: string;
// }

// const JWT_SECRET = "MYSECRECTKEY";

// export const signup = async (userData: any) => {
//   const { error } = validateUser(userData);
//   if (error) {
//     winston.error(`Validation failed: ${error.details[0].message}`);
//     throw new Error(error.details[0].message);
//   }

//   const existingUser = await User.findOne({ email: userData.email });
//   if (existingUser) {
//     winston.error("User already exists");
//     throw new Error("User already exists");
//   }

//   const hashedPassword = await bcrypt.hash(userData.password, 12);

//   const newUser = new User({
//     ...userData,
//     password: hashedPassword,
//   });

//   const result = await newUser.save();

//   // const token = jwt.sign({ email: result.email, id: result._id }, "test", {
//   //   expiresIn: "1h",
//   // });

//   //return { result, token };
//   return { result };
// };

// export const login = async (userData: UserData) => {
//   const { email, password } = userData;
//   if (!email || !password) {
//     throw new Error("הכנס אימייל וסיסמה");
//   }
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new Error("אין חשבון קיים לכתובת מייל זו");
//   }

//   const isPasswordCorrect = await bcrypt.compare(password, user.password);
//   if (!isPasswordCorrect) {
//     throw new Error("מייל או סיסמה לא תקינים");
//   }

//   const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, {
//     expiresIn: "1h",
//   });

//   return { result: user, token };
// };
