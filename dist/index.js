"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const winston_1 = __importDefault(require("winston"));
require("winston-mongodb");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const otpRoutes_1 = __importDefault(require("./routes/otpRoutes"));
const error_1 = __importDefault(require("./middleware/error"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.Console({ format: winston_1.default.format.simple() }),
        new winston_1.default.transports.File({ filename: "logfile.log" }),
        new winston_1.default.transports.MongoDB({
            db: "mongodb://localhost:27017/login-onboarding",
            collection: "log",
            level: "error",
            options: { useUnifiedTopology: true },
        }),
    ],
    exceptionHandlers: [
        new winston_1.default.transports.File({ filename: "exceptions.log" }),
    ],
});
const corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use("/api/otp", otpRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
mongoose_1.default
    .connect("mongodb://localhost:27017/login-onboarding")
    .then(() => {
    logger.info("Connected to MongoDB...");
    app.listen(PORT, () => logger.info(`Server running on port: ${PORT}`));
})
    .catch((error) => {
    logger.error("Error connecting to MongoDB", error);
});
app.use(error_1.default);
// import express from "express";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import cors from "cors";
// import winston from "winston";
// import "winston-mongodb";
// import userRoutes from "./routes/userRoutes";
// import errorMiddleware from "./middleware/error";
// import validateObjectId from "./middleware/validateObjectId";
// const app = express();
// const PORT = process.env.PORT || 3000;
// const logger = winston.createLogger({
//   level: "info",
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json()
//   ),
//   transports: [
//     new winston.transports.Console({ format: winston.format.simple() }),
//     new winston.transports.File({ filename: "logfile.log" }),
//     new winston.transports.MongoDB({
//       db: "mongodb://localhost:27017/login-onboarding",
//       collection: "log",
//       level: "error",
//       options: { useUnifiedTopology: true },
//     }),
//   ],
//   exceptionHandlers: [
//     new winston.transports.File({ filename: "exceptions.log" }),
//   ],
// });
// app.use(cors());
// app.use(bodyParser.json());
// app.use("/api/users", userRoutes);
// mongoose
//   .connect("mongodb://localhost:27017/login-onboarding")
//   .then(() => {
//     logger.info("Connected to MongoDB...");
//     app.listen(PORT, () => logger.info(`Server running on port: ${PORT}`));
//   })
//   .catch((error) => {
//     logger.error("Error connecting to MongoDB", error);
//   });
// app.use(errorMiddleware);
