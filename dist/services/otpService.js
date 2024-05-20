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
exports.verifyOtp = exports.sendOtp = void 0;
const twilio_1 = __importDefault(require("twilio"));
const winston_1 = __importDefault(require("winston"));
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = (0, twilio_1.default)(accountSid, authToken);
const messagingServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
let otpStorage = {};
const sendOtp = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    console.log(phoneNumber);
    winston_1.default.info(`Generated OTP: ${otp} for phone number: ${phoneNumber}`);
    yield client.messages.create({
        body: `Your OTP code is: ${otp}`,
        messagingServiceSid: messagingServiceSid,
        to: phoneNumber,
    });
    otpStorage[phoneNumber] = otp;
    return otp;
});
exports.sendOtp = sendOtp;
const verifyOtp = (phoneNumber, receivedOtp) => {
    const sentOtp = otpStorage[phoneNumber];
    if (sentOtp === receivedOtp) {
        delete otpStorage[phoneNumber];
        return true;
    }
    return false;
};
exports.verifyOtp = verifyOtp;
