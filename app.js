import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/companyProfileRoutes.js"
import userProfileRoutes from "./routes/userProfileRoutes.js"
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.JWT_SECRET;
console.log('Retrieved Secret Key:', secretKey);


const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());


mongoose
  .connect(
    "mongodb+srv://jackypatel9092:HARharmahadev1104@cluster0.vs8y4nd.mongodb.net/career_compass?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(err.message);
  });

app.use("/api/users", userRoutes);
app.use("/api/profile",profileRoutes);
app.use("/api/userprofile/",userProfileRoutes)

export default app;
