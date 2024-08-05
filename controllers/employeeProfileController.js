import CompanyProfile from "../models/CompanyProfile.js";
import { validationResult } from "express-validator";
import JobApplication from "../models/JobApplicationModel.js";
import job from "../models/JobModel.js";
import Company from "../models/Company.js";

// Create Company Profile
export const createCompanyProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { companyName, industry, companyDescription, address } = req.body;
  const companyLogo = req.file ? req.file.path : null;
  const userId = req.user.id;

  console.log("Creating company profile for user ID:", userId);

  const profileFields = {
    userId,
    companyName,
    companyLogo,
    industry,
    companyDescription,
    address: {
      street: address.street,
      city: address.city,
      country: address.country,
      postalCode: address.postalCode,
    },
  };

  try {
    const profile = new CompanyProfile(profileFields);
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getAllEmployerProfiles = async (req, res) => {
  try {
    const profiles = await CompanyProfile.find().populate("userId", [
      "name",
      "email",
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get Company Profile
export const getEmployerProfileAdmin = async (req, res) => {
  try {
    const companyId = req.params.companyId;  // Ensure this matches the route parameter
    console.log("Fetching company profile for company ID:", companyId);

    const profile = await CompanyProfile.findOne({ userId: companyId }).populate("userId", ["name", "email"]);
    if (!profile) {
      console.log("Company profile not found for company ID:", companyId);
      return res.status(404).json({ msg: "Profile not found" });
    }

    // Fetch the jobs created by the company
    const jobs = await job.find({ company_id: companyId });

    res.json({ profile, jobs });
  } catch (err) {
    console.error("Error fetching company profile with jobs:", err.message);
    res.status(500).send("Server error");
  }
};


// Get Company Profile
export const getCompanyProfile = async (req, res) => {
  try {
    console.log("Fetching company profile for user ID:", req.user.id);
    const profile = await CompanyProfile.findOne({  
      userId: req.user.id,
    }).populate("userId", ["name", "email"]);
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    // Construct the correct URL for the profile image
    if (profile.companyLogo) {
      const imagePath = profile.companyLogo.split("uploads\\")[1]; // Extract the filename
      profile.companyLogo = `${req.protocol}://${req.get(
        "host"
      )}/uploads/${imagePath}`;
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update Company Profile
export const updateCompanyProfile = async (req, res) => {
  console.log("updateCompanyProfile called with ID:", req.params.id);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { companyName, industry, companyDescription, address } = req.body;
  const companyLogo = req.file ? req.file.path : null;
  const userId = req.user.id;

  console.log("Updating company profile for user ID:", userId);

  const profileFields = {
    userId,
    companyName,
    companyLogo,
    industry,
    companyDescription,
    address: {
      street: address.street,
      city: address.city,
      country: address.country,
      postalCode: address.postalCode,
    },
  };

  // Remove empty fields
  if (!companyLogo) delete profileFields.companyLogo;

  try {
    const profile = await CompanyProfile.findOneAndUpdate(
      { userId: userId, _id: req.params.id }, // Ensure userId and profile _id match
      { $set: profileFields },
      { new: true, upsert: true } // `upsert: true` creates the document if it doesn't exist
    );

    if (!profile) {
      console.log("Profile not found");
      return res.status(404).json({ msg: "Profile not found" });
    }

    // Construct the correct URL for the profile image
    if (profile.companyLogo) {
      const imagePath = profile.companyLogo.split("uploads\\")[1]; // Extract the filename
      profile.companyLogo = `${req.protocol}://${req.get(
        "host"
      )}/uploads/${imagePath}`;
    }

    console.log("Profile updated:", profile);
    res.json(profile);
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).send("Server error");
  }
};

// export const deleteEmployerProfile = async (req, res) => {
//   try {
//     const companyId = req.params.companyId;
//     console.log("companyId:", companyId);

//     // Delete the employer profile by companyId
//     const employerProfile = await CompanyProfile.findOneAndDelete(  companyId );
//     const employer = await Company.findOneAndDelete( companyId );
//     // If your schema uses userId directly, use: 
//     // const employerProfile = await CompanyProfile.findOneAndDelete({ userId: companyId });

//     if (!employerProfile) {
//       console.log("Profile not found");
//       return res.status(404).json({ msg: "Employer profile not found" });
//     }

//     console.log("Profile deleted:", employerProfile);
//     res.json({ msg: "Employer profile deleted" });
//   } catch (err) {
//     console.error("Server error:", err.message);
//     res.status(500).send("Server error");
//   }
// };

export const deleteEmployerProfile = async (req, res) => {
  try {
    const companyId = req.params.companyId;

    // Delete the company profile
    const companyProfile = await CompanyProfile.findOneAndDelete({ companyId });
    if (!companyProfile) {
      return res.status(404).json({ msg: "Company profile not found" });
    }

    // Delete the user associated with the company
    await User.findByIdAndDelete(companyId);

    // Delete all jobs posted by this company
    await job.deleteMany({ companyId: companyProfile._id });

    res.json({ msg: "Company profile and associated jobs deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


