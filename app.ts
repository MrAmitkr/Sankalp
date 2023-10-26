require("dotenv").config();

import express, { Request, Response, NextFunction, Router } from "express";

export const app = express();

import cors from "cors";

import cookieParser from "cookie-parser";

import { ErrorMiddleware } from "./middleware/error"; // Remove braces and import it as a default export

import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";

import orderRouter from "./routes/Order.route";

import notificationRoute from "./routes/notification.route";

import analyticsRouter from "./routes/analytics.route";

import layoutRouter from "./routes/layout.route";

app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

//routes

app.use(
  "/api/v1",
  userRouter,
  orderRouter,
  courseRouter,
  notificationRoute,
  analyticsRouter,
  layoutRouter
);

// app.use("/api/v1", courseRouter);

///testing api

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});
// module.exports = Router;
app.use(ErrorMiddleware);
