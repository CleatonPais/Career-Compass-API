import Job from "../models/JobModel.js";
import JobApplication from "../models/JobApplicationModel.js";
import mongoose from "mongoose";
import { calculateSkillMatch } from "../controllers/JobApplicationController.js";

export const createJob = async (req, res) => {
  try {
    const { street, city, province, country, postalCode, ...rest } = req.body;
    const newJob = new Job({
      ...rest,
      company_id: req.user.id,
      location: { street, city, province, country, postalCode },
    });
    const job = await newJob.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    skills,
    description,
    requirements,
    street,
    city,
    province,
    country,
    postalCode,
    expiry_date,
    role,
    salary,
  } = req.body;

  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    const jobFields = {};
    if (title) jobFields.title = title;
    if (skills) jobFields.skills = skills;
    if (description) jobFields.description = description;
    if (requirements) jobFields.requirements = requirements;
    if (expiry_date) jobFields.expiry_date = expiry_date;
    if (role) jobFields.role = role;
    if (salary) jobFields.salary = salary;

    // Handle nested location field
    jobFields.location = {};
    if (street) jobFields.location.street = street;
    if (city) jobFields.location.city = city;
    if (province) jobFields.location.province = province;
    if (country) jobFields.location.country = country;
    if (postalCode) jobFields.location.postalCode = postalCode;

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { $set: jobFields },
      { new: true }
    );

    res.status(200).json(updatedJob);
  } catch (err) {
    console.error(`Server error: ${err.message}`);
    res.status(500).json({ msg: "Server error" });
  }
};

// Function to delete a job by ID
export const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the job by ID
    const job = await Job.findByIdAndDelete(id);

    // Check if the job was found and deleted
    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    // Return a success message
    res.json({ msg: "Job deleted successfully" });
  } catch (err) {
    // Log the error to the console for debugging
    console.error(err.message);

    // Return a server error response
    res.status(500).send("Server error");
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getAvailableJobs = async (req, res) => {
  const id = req.params.candidateid;

  try {
    // Fetch all job applications for the given candidate
    const appliedJobs = await JobApplication.find(
      { user_id: new mongoose.Types.ObjectId(id) },
      "job_id"
    );

    // Extract the job IDs from these applications
    const appliedJobIds = appliedJobs.map((application) => application.job_id);

    // Fetch all jobs excluding those with the IDs found in the applications
    const availableJobs = await Job.find({ _id: { $nin: appliedJobIds } });

    // Calculate skill match for each available job
    const jobsWithSkillMatch = await Promise.all(
      availableJobs.map(async (job) => {
        const { matchPercentage, fitCategory } = await calculateSkillMatch(
          id,
          job._id
        );
        return {
          ...job.toObject(),
          skillMatch: {
            matchPercentage,
            fitCategory,
          },
        };
      })
    );

    res.json(jobsWithSkillMatch);
    // res.json(availableJobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
