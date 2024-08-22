import express from "express";
import { check } from "express-validator";
import {
  createJob,
  deleteJob,
  updateJob,
  getAllJobs,
  getAvailableJobs,
} from "../controllers/JobController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

//create a new job

router.post(
  "/createjob",
  [
    authMiddleware,
    [
      check("company_id", "Company ID is required").not().isEmpty(),
      check("title", "Title is required").not().isEmpty(),
      check("skills", "Skills are required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("requirements", "Requirements are required").not().isEmpty(),
      check("location", "Location is required").not().isEmpty(),
      check("expiry_date", "Expiry date is required").not().isEmpty(),
    ],
  ],
  createJob
);

// Delete a job

router.delete("/delete/:id", authMiddleware, deleteJob);

// Update a job
router.put("/update/:id", authMiddleware, updateJob);

// get all jobs
router.get("/all", authMiddleware, getAllJobs);

router.get("/availablejobs/:candidateid", authMiddleware, getAvailableJobs);

export default router;
