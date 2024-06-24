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
    address,
    experience,
    education,
  } = req.body;
  const profileImage = req.file ? req.file.path : null;
  const userId = req.user.id;

  const profileFields = {
    userId,
    firstName,
    lastName,
    skills,
    profileImage,
    address: {
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postalCode: address.postalCode,
    },
    experience: {
      jobTitle: experience.jobTitle,
      jobDescription: experience.jobDescription,
      company: experience.company,
      startDate: experience.startDate,
      endDate: experience.endDate,
    },
    education: {
      qualification: education.qualification,
      institute: education.institute,
      endDate: education.endDate,
    },
  };

  try {
    const profile = new UserProfile(profileFields);
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
    address,
    experience,
    education,
  } = req.body;

  const profileFields = {};
  if (firstName) profileFields.firstName = firstName;
  if (lastName) profileFields.lastName = lastName;
  if (skills) profileFields.skills = skills;
  if (address) {
    profileFields.address = {
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postalCode: address.postalCode,
    };
  }
  if (experience) {
    profileFields.experience = {
      jobTitle: experience.jobTitle,
      jobDescription: experience.jobDescription,
      company: experience.company,
      startDate: experience.startDate,
      endDate: experience.endDate,
    };
  }
  if (education) {
    profileFields.education = {
      qualification: education.qualification,
      institute: education.institute,
      endDate: education.endDate,
    };
  }

  if (req.file) {
    profileFields.profileImage = req.file.path;
  }

  try {
    const id = req.params.id;
    let profile = await UserProfile.findById(id);

    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    profile = await UserProfile.findByIdAndUpdate(id, { $set: profileFields }, { new: true });

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
