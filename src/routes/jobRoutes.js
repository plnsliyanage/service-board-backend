import express from "express";
import {
  getJobs,
  getJobById,
  createJob,
  updateJobStatus,
  deleteJob,
} from "../controllers/jobController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getJobs);
router.get("/:id", getJobById);

// PROTECTED ROUTES
router.post("/", authMiddleware, roleMiddleware("HOMEOWNER"), createJob);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("TRADESPERSON"),
  updateJobStatus
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("HOMEOWNER"),
  deleteJob
);

export default router;