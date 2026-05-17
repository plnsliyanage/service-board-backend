import express from "express";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// IMPORTANT LINE
app.use("/api/jobs", jobRoutes);

export default app;