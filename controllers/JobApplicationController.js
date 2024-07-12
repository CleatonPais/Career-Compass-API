import JobApplication from "../models/JobApplication";

// create job application candidate
export const createJobApplication = async (req, res) => {
  try {
    const newJobApplication = new JobApplication({
      ...req.body,
      company_id: req.user.id,
    });
    const jobApplication = await newJobApplication.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// get all job applications candidate
export const getCandidateJobApplication = async (req, res) => {
  try {
    const jobApplication = await JobApplication.findAll({
      user_id: req.user.id,
    });
    if (!jobApplication) {
      return res.status(404).json({ msg: "No Job Application not found" });
    }

    res.json(jobApplication);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// get all job applicatoions employer
export const getEmployerJobApplication = async (req, res) => {
  try {
    const jobApplication = await JobApplication.findAll({
      employer_id: req.user.id,
    });
    if (!jobApplication) {
      return res.status(404).json({ msg: "No Job Application not found" });
    }

    res.json(jobApplication);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// update job application candidate/employer
export const updateJobApplication = async (req, res) => {
  const { id } = req.params;
  const { interview_date, status } = req.body;

  try {
    const jobApplication = await JobApplication.findById(id);
    if (!jobApplication) {
      return res.status(404).json({ msg: "No Job Application not found" });
    }

    const jobApplicationFields = {};
    if (status) jobApplicationFields.status = status;
    if (interview_date) jobFields.interview_date = interview_date;

    const updatedJobApplication = await JobApplication.findByIdAndUpdate(
      id,
      { $set: jobFields },
      { new: true }
    );

    res.status(200).json(updatedJobApplication);
  } catch (err) {
    console.error(`Server error: ${err.message}`);
    res.status(500).json({ msg: "Server error" });
  }
};

// Function to delete a job by ID
export const deleteJobApplication = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the job by ID
    const jobApplication = await JobApplication.findByIdAndDelete(id);

    // Check if the job was found and deleted
    if (!jobApplication) {
      return res.status(404).json({ msg: "Job Application not found" });
    }

    // Return a success message
    res.json({ msg: "Job Application deleted successfully" });
  } catch (err) {
    // Log the error to the console for debugging
    console.error(err.message);

    // Return a server error response
    res.status(500).send("Server error");
  }
};
