"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    accountSid: process.env.TWILIO_ACCOUNT_SID || "ACdfa3fb6f6e25485bb39b879370f07746",
    authToken: process.env.TWILIO_AUTH_TOKEN || "3581e50b300cc55e2c7840ba391a7ca8",
    verifyServiceSid: process.env.TWILIO_VERIFY_SERVICE_SID ||
        "MG0fc5fdddf7c02120f90df8d41ae99b55",
};
