import mongoose from "mongoose";
const interviewDateSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
});

const jobApplicationSchema = new mongoose.Schema({
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  job_title: {
    type: String,
    required: true 
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
    enum: [
      "Submitted",
      "Approved",
      "Rejected",
      "Pending",
      "Interview Scheduled",
      "Interview Confirmed",
    ],
    required: true,
    default: "Submitted",
  },
  interview_dates: [interviewDateSchema],
  interview_details: {
    type: String,
  },
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
