import jwt from "jsonwebtoken";
import UserSession from "../models/UserSession.js";

import dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.JWT_SECRET;

export const authMiddleware = async (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");
  console.log("aM token:", token);

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, secretKey);

    // Attach user info to request
    req.user = decoded.user;
    console.log(req.user);

    // Find the user session
    const session = await UserSession.findOne({
      user_id: req.user.id,
      auth_token: token,
    });

    console.log("session: ", session);

    if (!session) {
      return res
        .status(401)
        .json({ msg: "Invalid token, authorization denied" });
    }

    // Check if the current request is within the 15-minute limit
    const fifteenMinutes = 15 * 60 * 1000; // 15 minutes in milliseconds
    const now = new Date();
    const lastRequest = new Date(session.request_date);

    if (now - lastRequest > fifteenMinutes) {
      await UserSession.findOneAndDelete({
        user_id: req.user.id,
      });
      return res
        .status(401)
        .json({ msg: "Session expired, please log in again" });
    }

    // Update the request_date to the current date
    session.request_date = now;
    await session.save();
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
