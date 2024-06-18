// models/UserProfile.js
import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  skills: {
    type: [String],
    required: false,
  },
  street: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  jobEndDate: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  institute: {
    type: String,
    required: true,
  },
  qualificationEndDate: {
    type: String,
    required: true,
  },
});

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);

export default UserProfile;
