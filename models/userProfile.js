import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  profileImage: {
    type: String,
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
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
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
  },
  experience: {
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
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  education: {
    qualification: {
      type: String,
      required: true,
    },
    institute: {
      type: String,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
});

export default mongoose.model("UserProfile", UserProfileSchema);
