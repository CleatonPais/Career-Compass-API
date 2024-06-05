import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://cleatonps:Roger4192@cluster0.axe3bfr.mongodb.net/career_compass?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(err.message);
  });

app.use("/api/users", userRoutes);

export default app;
