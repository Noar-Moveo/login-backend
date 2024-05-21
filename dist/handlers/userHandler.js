"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.sendResetLink = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const winston_1 = __importDefault(require("winston"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const JWT_SECRET = "MYSECRECTKEY";
const RESET_PASSWORD_SECRET = "MYRESETSECRETKEY"; // Secret key for password reset tokens
const signup = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, userModel_1.validateUser)(userData);
    if (error) {
        winston_1.default.error(`Validation failed: ${error.details[0].message}`);
        throw new Error(error.details[0].message);
    }
    const existingUser = yield userModel_1.User.findOne({ email: userData.email });
    if (existingUser) {
        winston_1.default.error("User already exists");
        throw new Error("User already exists");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(userData.password, 12);
    const newUser = new userModel_1.User(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
    const result = yield newUser.save();
    return { result };
});
exports.signup = signup;
const login = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = userData;
    if (!email || !password) {
        throw new Error("הכנס אימייל וסיסמה");
    }
    const user = yield userModel_1.User.findOne({ email });
    if (!user) {
        throw new Error("אין חשבון קיים לכתובת מייל זו");
    }
    const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new Error("מייל או סיסמה לא תקינים");
    }
    const token = jsonwebtoken_1.default.sign({ email: user.email, id: user._id }, JWT_SECRET, {
        expiresIn: "1h",
    });
    return { result: user, token };
});
exports.login = login;
const sendResetLink = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.User.findOne({ email });
    if (!user) {
        throw new Error("אין חשבון קיים לכתובת מייל זו");
    }
    const token = jsonwebtoken_1.default.sign({ email: user.email, id: user._id }, RESET_PASSWORD_SECRET, {
        expiresIn: "1h",
    });
    const transporter = nodemailer_1.default.createTransport({
        service: "Gmail",
        auth: {
            user: "noa2308r@gmail.com",
            pass: "Noa2308rmail",
        },
    });
    const mailOptions = {
        from: "noa2308r@gmail.com",
        to: user.email,
        subject: "Password Reset",
        text: `Please use the following link to reset your password: http://localhost:3000/reset-password?token=${token}`,
    };
    yield transporter.sendMail(mailOptions);
});
exports.sendResetLink = sendResetLink;
const updatePassword = (token, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(token, RESET_PASSWORD_SECRET);
    }
    catch (error) {
        throw new Error("Invalid or expired token");
    }
    const user = yield userModel_1.User.findById(decoded.id);
    if (!user) {
        throw new Error("User not found");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 12);
    user.password = hashedPassword;
    yield user.save();
});
exports.updatePassword = updatePassword;
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
