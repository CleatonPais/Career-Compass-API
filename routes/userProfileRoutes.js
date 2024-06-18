// routes/userProfileRoutes.js
import express from "express";
import { check } from "express-validator";
import { createUserProfile, updateUserProfile ,getUserProfile } from "../controllers/userProfileController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/createuserprofile",
  [
    authMiddleware,
    [
      check("firstName", "First name is required").not().isEmpty(),
      check("lastName", "Last name is required").not().isEmpty(),
      check("street", "Street is required").not().isEmpty(),
      check("country", "Country is required").not().isEmpty(),
      check("postalCode", "Postal code is required").not().isEmpty(),
      check("jobTitle", "Job title is required").not().isEmpty(),
      check("jobDescription", "Job description is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("startDate", "Start date is required").not().isEmpty(),
      check("jobEndDate", "Job end date is required").not().isEmpty(),
      check("qualification", "Qualification is required").not().isEmpty(),
      check("institute", "Institute is required").not().isEmpty(),
      check("qualificationEndDate", "Qualification end date is required").not().isEmpty(),
    ],
  ],
  createUserProfile
);

router.put("/updateprofile/:id", authMiddleware, updateUserProfile )
router.get("/getuserprofile", authMiddleware, getUserProfile);

export default router;
