// controllers/userProfileController.js
import UserProfile from "../models/UserProfile.js";
import { validationResult } from "express-validator";

export const createUserProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    firstName,
    lastName,
    skills,
    street,
    country,
    postalCode,
    jobTitle,
    jobDescription,
    company,
    startDate,
    jobEndDate,
    qualification,
    institute,
    qualificationEndDate,
  } = req.body;
  const userId = req.user.id;

  try {
    const profile = new UserProfile({
      userId,
      firstName,
      lastName,
      skills,
      street,
      country,
      postalCode,
      jobTitle,
      jobDescription,
      company,
      startDate,
      jobEndDate,
      qualification,
      institute,
      qualificationEndDate,
    });

    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const updateUserProfile = async (req, res) => {
  const {
    firstName,
    lastName,
    skills,
    street,
    country,
    postalcode,
    jobTitle,
    jobDescription,
    company,
    startDate,
    jobEndDate,
    qualification,
    institute,
    qualificationEndDate,
  } = req.body;
  const userId = req.user.id;
  const profileFields = {
    firstName,
    lastName,
    skills,
    street,
    country,
    postalcode,
    jobTitle,
    jobDescription,
    company,
    startDate,
    jobEndDate,
    qualification,
    institute,
    qualificationEndDate,
  };

  try {
    let profile = await UserProfile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    profile = await UserProfile.findOneAndUpdate(
      { user: userId },
      { $set: profileFields },
      { new: true }
    );

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.user.id }).populate("userId", ["name", "email"]);
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
