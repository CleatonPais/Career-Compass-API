import express from "express";
import multer from "multer";
import { check } from "express-validator";
import { createCompanyProfile, getCompanyProfile } from "../controllers/employeeProfileController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // You can configure the destination and other options

router.post(
  "/createcompanyprofile",
  [
    authMiddleware,
    upload.single('companyLogo'),
    [
      check("companyName", "Company name is required").not().isEmpty(),
      check("industry", "Industry is required").not().isEmpty(),
      check("address.street", "Street is required").not().isEmpty(),
      check("address.city", "City is required").not().isEmpty(),
      check("address.country", "Country is required").not().isEmpty(),
      check("address.postalCode", "Postal code is required").not().isEmpty(),
    ],
  ],
  createCompanyProfile
);

router.get("/getcompanyprofile", authMiddleware, getCompanyProfile);

export default router;
