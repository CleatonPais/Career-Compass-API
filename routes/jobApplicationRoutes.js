import { fileURLToPath } from "url";
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
  rejectApplication,
  approveApplication,
  confirmInterview,
  calculateSkillMatch 
} from "../controllers/JobApplicationController.js";

const router = express.Router();

// create job application candidate
router.post(
  "/createjobapplication",
  [
    authMiddleware,
    upload.fields([
      { name: "resume", maxCount: 1 },
      { name: "cover_letter", maxCount: 1 },
      { name: "portfolio", maxCount: 1 },
    ]),
    [
      check("job_id", "Job ID is required").not().isEmpty(),
      check("user_id", "User ID is required").not().isEmpty(),
      check("company_id", "Company ID is required").not().isEmpty(),
      check("firstName", "First name is required").not().isEmpty(),
      check("lastName", "Last name is required").not().isEmpty(),
      check("email", "Email is required").isEmail(),
      check("phoneNumber", "Phone number is required").not().isEmpty(),
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
router.get("/jobapplication/:id", authMiddleware, getJobApplicationById);

// delete job application
router.delete(
  "/deletejobapplication/:id",
  authMiddleware,
  deleteJobApplication
);

// schedule interview
router.put("/scheduleinterview/:id", authMiddleware, scheduleInterview);

// confrim interview
router.put("/confirminterview/:id", authMiddleware, confirmInterview);

// reject application
router.put("/rejectapplication/:id", authMiddleware, rejectApplication);

// accept application
router.put("/approveapplication/:id", authMiddleware, approveApplication);

 //Calculate skill match and determine fit category
router.get(
  "/calculateskillmatch/:candidateId/:jobId",
  authMiddleware,
  async (req, res) => {
    const { candidateId, jobId } = req.params;
    const result = await calculateSkillMatch(candidateId, jobId);
    if (result.error) {
      return res.status(400).json({ msg: result.error });
    }
    res.json(result);
  }
);


export default router;
