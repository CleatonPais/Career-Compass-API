import User from "../models/User.js";
import Company from "../models/Company.js";
import Job from "../models/JobModel.js";

export const getAdminDashboard = async (req, res) => {
  try {
    // Count candidates
    const candidatesCount = await User.countDocuments({ role: "candidate" });

    // Count employers
    const employersCount = await Company.countDocuments();

    // Count jobs
    const jobsCount = await Job.countDocuments();

    res.json({
      candidatesCount: candidatesCount,
      employersCount: employersCount,
      jobsCount: jobsCount,
    });
  } catch (error) {
    console.error("Error fetching counts:", error);
    res.status(500).send("Server error");
  }
};
