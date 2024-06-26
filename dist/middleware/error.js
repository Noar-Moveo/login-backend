"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
function default_1(err, req, res, next) {
    console.log("Error middleware called");
    winston_1.default.error(err.message, err);
    if (err instanceof Error) {
        res.status(500).json({ error: err.message });
    }
    else {
        res.status(500).json({ error: "Something failed." });
    }
}
exports.default = default_1;
