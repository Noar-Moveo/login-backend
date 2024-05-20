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
exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = require("../models/userModel");
const winston_1 = __importDefault(require("winston"));
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
    // const token = jwt.sign({ email: result.email, id: result._id }, "test", {
    //   expiresIn: "1h",
    // });
    //return { result, token };
    return { result };
});
exports.signup = signup;
