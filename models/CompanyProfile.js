import mongoose from "mongoose";

// Model for the employee profile  

const companyprofileschema = new mongoose.Schema({
 // To make relation between actual user and profile we are giving userid explicitly and it is also taking reference from user model.
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  companyName: { type: String, required: true },
  companyLogo: { type: String, required: true },
  industry: { type: String, required: true },
  companyDescription: { type: String },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const CompanyProfile = mongoose.model("EmployeeProfile", companyprofileschema);

export default CompanyProfile;