// controllers/userProfileController.js
import UserProfile from "../models/userProfile.js";
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
  const userprofileimg = req.file ? req.file.path : null;
  const userId = req.user.id;

  try {
    const profile = new UserProfile({
      userId,
      userprofileimg,
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
// export const updateUserProfile = async (req, res) => {
//   const {
//     firstName,
//     lastName,
//     skills,
//     street,
//     country,
//     postalcode,
//     jobTitle,
//     jobDescription,
//     company,
//     startDate,
//     jobEndDate,
//     qualification,
//     institute,
//     qualificationEndDate,
//   } = req.body;

//   const profileFields = {};
//   if (firstName) profileFields.firstName = firstName;
//   if (lastName) profileFields.lastName = lastName;
//   if (skills) profileFields.skills = skills;
//   if (street) profileFields.street = street;
//   if (country) profileFields.country = country;
//   if (postalcode) profileFields.postalcode = postalcode;
//   if (jobTitle) profileFields.jobTitle = jobTitle;
//   if (jobDescription) profileFields.jobDescription = jobDescription;
//   if (company) profileFields.company = company;
//   if (startDate) profileFields.startDate = startDate;
//   if (jobEndDate) profileFields.jobEndDate = jobEndDate;
//   if (qualification) profileFields.qualification = qualification;
//   if (institute) profileFields.institute = institute;
//   if (qualificationEndDate) profileFields.qualificationEndDate = qualificationEndDate;

//   try {
//     const id = req.params.id; // Retrieve the ID from the request parameters

//     let profile = await UserProfile.findById(id);

//     if (!profile) {
//       console.log("Profile not found in the database");
//       return res.status(404).json({ msg: "Profile not found" });
//     }

//     console.log("Profile found: ", profile);

//     profile = await UserProfile.findByIdAndUpdate(
//       id,
//       { $set: profileFields },
//       { new: true }
//     );

//     res.json(profile);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };

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

  const profileFields = {};
  if (firstName) profileFields.firstName = firstName;
  if (lastName) profileFields.lastName = lastName;
  if (skills) profileFields.skills = skills;
  if (street) profileFields.street = street;
  if (country) profileFields.country = country;
  if (postalcode) profileFields.postalcode = postalcode;
  if (jobTitle) profileFields.jobTitle = jobTitle;
  if (jobDescription) profileFields.jobDescription = jobDescription;
  if (company) profileFields.company = company;
  if (startDate) profileFields.startDate = startDate;
  if (jobEndDate) profileFields.jobEndDate = jobEndDate;
  if (qualification) profileFields.qualification = qualification;
  if (institute) profileFields.institute = institute;
  if (qualificationEndDate) profileFields.qualificationEndDate = qualificationEndDate;

  // Handle file upload
  if (req.file) {
    profileFields.userprofileimg = req.file.path;
  }

  try {
    const id = req.params.id; // Retrieve the ID from the request parameters

    let profile = await UserProfile.findById(id);

    if (!profile) {
      console.log("Profile not found in the database");
      return res.status(404).json({ msg: "Profile not found" });
    }

    console.log("Profile found: ", profile);

    profile = await UserProfile.findByIdAndUpdate(
      id,
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
