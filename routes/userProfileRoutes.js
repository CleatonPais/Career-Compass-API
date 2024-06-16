import express from "express";
import { getProfile, updateProfile } from "../controllers/userProfileController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Assuming you have an authentication middleware

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

export default router;
