import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import jobRoutes from "./routes/jobRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();


   //ALLOWED FRONTEND DOMAINS

const allowedOrigins = [
  "http://localhost:3000",
  "https://service-board-frontend-one.vercel.app",
];

/* ======================
   MIDDLEWARE
====================== */
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

/* ======================
   TEST ROUTE (IMPORTANT)
====================== */
app.get("/", (req, res) => {
  res.json({
    message: "Service Board Backend is running 🚀",
  });
});

/* ======================
   ROUTES
====================== */
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

/* ======================
   404 HANDLER
====================== */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* ======================
   GLOBAL ERROR HANDLER
====================== */
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: err.message || "Server Error",
  });
});

/* ======================
   DATABASE CONNECTION
====================== */
connectDB();

/* ======================
   START SERVER (RAILWAY FIX)
====================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});