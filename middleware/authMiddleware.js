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


export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}