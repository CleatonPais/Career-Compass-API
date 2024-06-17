import Job from "../models/JobModel.js";

export const createJob = async (req, res) => {
  try {
    const newJob = new Job({ ...req.body, company_id: req.user.id });
    const job = await newJob.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const { title, skills, description, requirements, location, expiry_date, role, salary } = req.body;

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
    if (location) jobFields.location = location;
    if (expiry_date) jobFields.expiry_date = expiry_date;
    if (role) jobFields.role = role;
    if (salary) jobFields.salary = salary;

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
