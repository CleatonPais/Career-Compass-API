import { fileURLToPath } from 'url';
import express from "express";
import { check } from "express-validator";
import { authMiddleware } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

import {
  createJobApplication,
  deleteJobApplication,
  getCandidateJobApplication,
  getEmployerJobApplication,
  updateJobApplication,
  getJobApplicationById,
  scheduleInterview,
  rejectApplication

} from "../controllers/JobApplicationController.js";

const router = express.Router();

// create job application candidate
router.post(
  "/createjobapplication",
  [
    authMiddleware,
    upload.fields([
      { name: 'resume', maxCount: 1 },
      { name: 'cover_letter', maxCount: 1 },
      { name: 'portfolio', maxCount: 1 },
    ]),
    [
      check("job_id", "Job ID is required").not().isEmpty(),
      check("user_id", "User ID is required").not().isEmpty(),
      check("company_id", "Company ID is required").not().isEmpty(),
      check('firstName', 'First name is required').not().isEmpty(),
      check('lastName', 'Last name is required').not().isEmpty(),
      check('email', 'Email is required').isEmail(),
      check('phoneNumber', 'Phone number is required').not().isEmpty(),
    ],
  ],
  createJobApplication
);

// update job application candidate/employer
router.put("/updatejobapplication/:id", authMiddleware, updateJobApplication);

// get all job applications candidate
router.get(
  "/getcandidatejobapplications",
  authMiddleware,
  getCandidateJobApplication
);

// get all job applications employer
router.get(
  "/getemployerjobapplications",
  authMiddleware,
  getEmployerJobApplication
);

// get job application by ID
router.get('/jobapplication/:id', authMiddleware, getJobApplicationById);

// delete job application
router.delete(
  "/deletejobapplication/:id",
  authMiddleware,
  deleteJobApplication
);

// schedule interview
router.put("/scheduleinterview/:id", authMiddleware, scheduleInterview);

// reject application
router.put("/rejectapplication/:id", authMiddleware, rejectApplication);

export default router;
