import CompanyProfile from "../models/CompanyProfile.js";
import { validationResult } from "express-validator";

export const createCompanyProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    companyName,
    industry,
    companyDescription,
    address
  } = req.body;

  const companyLogo = req.file ? req.file.path : null;
  const userId = req.user.id; // Extract userId from req.user

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
    }
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

export const getCompanyProfile = async (req, res) => {
    try {
      const profile = await CompanyProfile.findOne({ userId: req.user.id }).populate("userId", ["name", "email"]);
      if (!profile) {
        return res.status(404).json({ msg: "Profile not found" });
      }
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };
