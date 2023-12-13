import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// middleware
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "120kb" }));
app.use(express.urlencoded({ extended: true, limit: "120kb" }));
app.use(express.static('public'));
app.use(cookieParser());

// imports route

import { router as userRoutes } from "./routes/user.route.js";

app.use("/api/v1/users", userRoutes);
export { app };