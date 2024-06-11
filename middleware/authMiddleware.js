import jwt from "jsonwebtoken";

import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.JWT_SECRET;

export const authMiddleware = async (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, secretKey);

    // Attach user info to request
    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};