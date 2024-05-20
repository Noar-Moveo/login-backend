import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import winston from "winston";
import "winston-mongodb";
import userRoutes from "./routes/userRoutes";
import otpRoutes from "./routes/otpRoutes";
import errorMiddleware from "./middleware/error";
import validateObjectId from "./middleware/validateObjectId";

const app = express();
const PORT = process.env.PORT || 3000;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: "logfile.log" }),
    new winston.transports.MongoDB({
      db: "mongodb://localhost:27017/login-onboarding",
      collection: "log",
      level: "error",
      options: { useUnifiedTopology: true },
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exceptions.log" }),
  ],
});

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/api/otp", otpRoutes);
app.use("/api/users", userRoutes);

mongoose
  .connect("mongodb://localhost:27017/login-onboarding")
  .then(() => {
    logger.info("Connected to MongoDB...");
    app.listen(PORT, () => logger.info(`Server running on port: ${PORT}`));
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB", error);
  });

app.use(errorMiddleware);
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
