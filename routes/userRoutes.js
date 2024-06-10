import express from "express";
import { body } from "express-validator";
import {
  signup,
  login,
  forgotPassword,
} from "../controllers/userController.js";

const router = express.Router();

router.post(
  "/signup",
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("role")
      .isIn(["candidate", "company"])
      .withMessage("Role must be either candidate or company"),
  ],
  signup
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").exists().withMessage("Password is required"),
  ],
  login
);

router.post(
  "/forgot-password",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("confirmPassword")
      .isLength({ min: 6 })
      .withMessage("Confirm Password must be at least 6 characters long"),
  ],
  forgotPassword
);

export default router;
