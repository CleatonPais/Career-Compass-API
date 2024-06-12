import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
  expiry_date: {
    type: Date,
    required: true,
  },
});

const Job = mongoose.model("Job", jobSchema);
export default Job;
