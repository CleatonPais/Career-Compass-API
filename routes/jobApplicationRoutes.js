import express from "express";
import { check } from "express-validator";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createJobApplication,
  deleteJobApplication,
  getCandidateJobApplication,
  getEmployerJobApplication,
  updateJobApplication,
} from "../controllers/JobApplicationController.js";

const router = express.Router();

// create job application candidate
router.post(
  "/createjobapplication",
  [
    authMiddleware,
    [
      check("job_id", "Job ID is required").not().isEmpty(),
      check("user_id", "User ID is required").not().isEmpty(),
      check("company_id", "Company ID is required").not().isEmpty(),
    ],
  ],
  createJobApplication
);

// update job application candidate/employer
router.put("updatejobapplication/:id", authMiddleware, updateJobApplication);

// get all job applications candidate
router.get(
  "/getcandidatejobapplications/:id",
  authMiddleware,
  getCandidateJobApplication
);

// get all job applicatoions employer
router.get(
  "/getemployerjobapplications/:id",
  authMiddleware,
  getEmployerJobApplication
);

// delete job application
router.delete(
  "/deletejobapplication/:id",
  authMiddleware,
  deleteJobApplication
);
