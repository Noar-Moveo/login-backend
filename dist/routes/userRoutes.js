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
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userModel_1 = require("../models/userModel");
const router = express_1.default.Router();
router.post("/signup", userController_1.signup);
router.post("/login", userController_1.login);
router.post("/forgot-password", userController_1.forgotPassword);
router.post("/reset-password", userController_1.resetPassword);
router.post("/check-email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const existingUser = yield userModel_1.User.findOne({ email });
    if (existingUser) {
        return res.status(200).json({ exists: true });
    }
    else {
        return res.status(200).json({ exists: false });
    }
}));
exports.default = router;
