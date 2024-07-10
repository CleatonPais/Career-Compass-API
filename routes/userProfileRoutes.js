import express from "express";
import upload from '../middleware/upload.js';
import { check } from "express-validator";
import { createUserProfile, updateUserProfile, getUserProfile } from "../controllers/userProfileController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/createUserProfile",  
  [
    authMiddleware,
    upload.single('profileImage'),
    [
      check("firstName", "First name is required").not().isEmpty(),
      check("lastName", "Last name is required").not().isEmpty(),
      check("address.street", "Street is required").not().isEmpty(),
      check("address.city", "City is required").not().isEmpty(),
      check("address.province", "Province is required").not().isEmpty(),
      check("address.country", "Country is required").not().isEmpty(),
      check("address.postalCode", "Postal code is required").not().isEmpty(),
      check("experience.jobTitle", "Job title is required").not().isEmpty(),
      check("experience.jobDescription", "Job description is required").not().isEmpty(),
      check("experience.company", "Company is required").not().isEmpty(),
      check("experience.startDate", "Start date is required").not().isEmpty(),
      check("experience.endDate", "End date is required").not().isEmpty(),
      check("education.qualification", "Qualification is required").not().isEmpty(),
      check("education.institute", "Institute is required").not().isEmpty(),
      check("education.endDate", "Qualification end date is required").not().isEmpty(),
    ],
  ],
  createUserProfile
);

router.put("/updateProfile/:id", [authMiddleware, upload.single('profileImage')], updateUserProfile);
router.get("/getUserProfile", authMiddleware, getUserProfile);

export default router;
