import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
  jobTitle: {
    type: String,
    default: "",
  },
  company: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  linkedinUrl: {
    type: String,
    default: "",
  },
  skills: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);

export default UserProfile;
