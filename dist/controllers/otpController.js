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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.sendOtp = void 0;
const otpService_1 = require("../services/otpService");
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phoneNumber } = req.body;
        console.log(phoneNumber);
        const otp = yield (0, otpService_1.sendOtp)(phoneNumber);
        res.status(200).json({ message: "OTP sent successfully", otp });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error sending OTP:", error);
            res.status(500).json({ message: error.message });
        }
        else {
            console.error("Unknown error sending OTP:", error);
            res.status(500).json({ message: "An unknown error occurred." });
        }
    }
});
exports.sendOtp = sendOtp;
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phoneNumber, receivedOtp } = req.body;
        const isValid = (0, otpService_1.verifyOtp)(phoneNumber, receivedOtp);
        if (isValid) {
            res.status(200).json({ message: "OTP verified successfully" });
        }
        else {
            res.status(400).json({ message: "Invalid OTP" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error verifying OTP:", error);
            res.status(500).json({ message: error.message });
        }
        else {
            console.error("Unknown error verifying OTP:", error);
            res.status(500).json({ message: "An unknown error occurred." });
        }
    }
});
exports.verifyOtp = verifyOtp;
