"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const joi_objectid_1 = __importDefault(require("joi-objectid"));
joi_1.default.objectId = (0, joi_objectid_1.default)(joi_1.default);
const userSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    companyName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    password: { type: String, required: true },
    bank: { type: String },
    branch: { type: String },
    accountNumber: { type: String },
    creditCardName: { type: String },
    creditCardNumber: { type: String },
    expirationDate: { type: String },
    cvv: { type: String },
    agreedToTerms: { type: Boolean, default: false },
    businessID: { type: String, required: true },
});
const User = mongoose_1.default.model("User", userSchema);
exports.User = User;
function validateUser(user) {
    const schema = joi_1.default.object({
        firstName: joi_1.default.string().regex(/^[a-zA-Z]{1,50}$/).required(),
        lastName: joi_1.default.string().regex(/^[a-zA-Z]{1,50}$/).required(),
        companyName: joi_1.default.string().regex(/^[a-zA-Z0-9]{1,50}$/).required(),
        email: joi_1.default.string().email().required(),
        phoneNumber: joi_1.default.string()
            .regex(/^(50|52|53|54|55|57|58)\d{7}$/)
            .required(),
        dateOfBirth: joi_1.default.date().required(),
        password: joi_1.default.string().min(6).required(),
        bank: joi_1.default.string().allow(""),
        branch: joi_1.default.string().regex(/^\d{3}$/).allow(""),
        accountNumber: joi_1.default.string().regex(/^\d{1,9}$/).allow(""),
        creditCardName: joi_1.default.string().regex(/^[a-zA-Z]{1,50}$/).allow(""),
        creditCardNumber: joi_1.default.string().regex(/^\d{16}$/).allow(""),
        expirationDate: joi_1.default.string().allow(""),
        cvv: joi_1.default.string().regex(/^\d{3}$/).allow(""),
        agreedToTerms: joi_1.default.boolean().default(false),
        businessID: joi_1.default.string().regex(/^\d{8,9}$/).required(),
    });
    return schema.validate(user);
}
exports.validateUser = validateUser;
