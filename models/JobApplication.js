import mongoose from "mongoose";

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
  interview_date: {
    date: { type: Date },
    time: { type: String },
    isTimeSlotSelected: { type: Boolean },
  },
  status: {
    type: String,
    enum: ["submitted", "approved", "rejected", "pending"],
    required: true,
    default: "submitted",
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
  modified_date: {
    type: Date,
    required: true,
  },
});

const JobApplication = mongoose.model("Job", jobApplicationSchema);

export default JobApplication;
