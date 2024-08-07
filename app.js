import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/companyProfileRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import userProfileRoutes from "./routes/userProfileRoutes.js";
import jobApplicationRoutes from "./routes/jobApplicationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const app = express();

dotenv.config();

const secretKey = process.env.JWT_SECRET;
console.log("Retrieved Secret Key:", secretKey);

// Define __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://cleatonps:Roger4192@cluster0.axe3bfr.mongodb.net/career_compass?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(err.message);
  });

app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/userprofile", userProfileRoutes);
app.use("/api/jobapplications", jobApplicationRoutes);
app.use("/api/admin", adminRoutes);

export default app;
