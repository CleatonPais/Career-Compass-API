import mongoose from "mongoose";
const interviewDateSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true }
});
const jobApplicationSchema = new mongoose.Schema({
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  cover_letter: {
    type: String,
    required: true,
  },
  portfolio: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["submitted", "approved", "rejected", "pending","interview_scheduled"],
    required: true,
    default: "submitted",
  },
  interview_dates: [interviewDateSchema],
  creation_date: {
    type: Date,
    default: Date.now,
  },
  modified_date: {
    type: Date,
    default: Date.now,
  },
});

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

export default JobApplication;