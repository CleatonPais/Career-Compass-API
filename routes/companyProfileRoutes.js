import express from "express";
import { check } from "express-validator";
import { createCompanyProfile, getCompanyProfile } from "../controllers/employeeProfileController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post(
    "/createcompanyprofile",
    [
      authMiddleware,
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
