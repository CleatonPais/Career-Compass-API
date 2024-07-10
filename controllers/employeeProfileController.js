import CompanyProfile from "../models/CompanyProfile.js";
import { validationResult } from "express-validator";

// Create Company Profile
export const createCompanyProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { companyName, industry, companyDescription, address } = req.body;
  const companyLogo = req.file ? req.file.path : null;
  const userId = req.user.id;

  console.log('Creating company profile for user ID:', userId);

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

// Get Company Profile
export const getCompanyProfile = async (req, res) => {
  try {
    console.log('Fetching company profile for user ID:', req.user.id);
    const profile = await CompanyProfile.findOne({ userId: req.user.id }).populate("userId", ["name", "email"]);
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    // Construct the correct URL for the profile image
    if (profile.companyLogo) {
      const imagePath = profile.companyLogo.split('uploads\\')[1]; // Extract the filename
      profile.companyLogo = `${req.protocol}://${req.get('host')}/uploads/${imagePath}`;
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

  console.log('Updating company profile for user ID:', userId);

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
      const imagePath = profile.companyLogo.split('uploads\\')[1]; // Extract the filename
      profile.companyLogo = `${req.protocol}://${req.get('host')}/uploads/${imagePath}`;
    }

    console.log("Profile updated:", profile);
    res.json(profile);
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).send("Server error");
  }
};
