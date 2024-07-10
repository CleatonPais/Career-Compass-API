import express from 'express';
import upload from '../middleware/upload.js';
import { check } from 'express-validator';
import { createCompanyProfile, updateCompanyProfile, getCompanyProfile } from '../controllers/employeeProfileController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
  '/createCompanyProfile',
  [
    authMiddleware,
    upload.single('companyLogo'),
    [
      check('companyName', 'Company name is required').not().isEmpty(),
      check('industry', 'Industry is required').not().isEmpty(),
      check('address.street', 'Street is required').not().isEmpty(),
      check('address.city', 'City is required').not().isEmpty(),
      check('address.country', 'Country is required').not().isEmpty(),
      check('address.postalCode', 'Postal code is required').not().isEmpty(),
    ],
  ],
  createCompanyProfile
);

router.put(
  '/updateCompanyProfile/:id',
  [authMiddleware, upload.single('companyLogo')],
  updateCompanyProfile
);

router.get('/getCompanyProfile', authMiddleware, getCompanyProfile);

export default router;
