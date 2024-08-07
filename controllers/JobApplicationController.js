import JobApplication from "../models/JobApplicationModel.js";
import Job from "../models/JobModel.js";

export const createJobApplication = async (req, res) => {
  const {
    job_id,
    user_id,
    company_id,
    firstName,
    lastName,
    email,
    phoneNumber,
  } = req.body;

  if (
    !req.files ||
    !req.files.resume ||
    !req.files.cover_letter ||
    !req.files.portfolio
  ) {
    return res.status(400).json({ msg: "Please upload all required files" });
  }

  const resume = req.files["resume"][0].filename;
  const cover_letter = req.files["cover_letter"][0].filename;
  const portfolio = req.files["portfolio"][0].filename;

  try {
    // Fetch the job to get the job title
    const job = await Job.findById(job_id);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Create a new job application including the job title
    const newJobApplication = new JobApplication({
      job_id,
      job_title: job.title, 
      user_id,
      company_id,
      firstName,
      lastName,
      email,
      phoneNumber,
      resume,
      cover_letter,
      portfolio,
      modified_date: new Date(),
    });

    const jobApplication = await newJobApplication.save();
    res.status(201).json(jobApplication);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// get all job applications candidate
export const getCandidateJobApplication = async (req, res) => {
  try {
    const jobApplication = await JobApplication.find({
      user_id: req.user.id,
    }).populate("job_id", "title location role");
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
    const jobApplications = await JobApplication.find({
      company_id: req.user.id,
    })
      .populate("job_id", "title role") // populate job title and role
      .populate("user_id", "name"); // populate user details

    if (!jobApplications.length) {
      return res.status(404).json({ msg: "No Job Applications found" });
    }

    res.json(jobApplications);
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

export const getJobApplicationById = async (req, res) => {
  const { id } = req.params;
  try {
    const jobApplication = await JobApplication.findById(id)
      .populate("job_id", "title role location description skills requirements")
      .populate("company_id", "name")
      .populate("user_id", "name");
    if (!jobApplication) {
      return res.status(404).json({ msg: "Job Application not found" });
    }
    res.json(jobApplication);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const updateInterviewDates = async (req, res) => {
  const { id } = req.params;
  const { interview_dates } = req.body;

  try {
    const jobApplication = await JobApplication.findById(id);
    if (!jobApplication) {
      return res.status(404).json({ msg: "Job Application not found" });
    }

    jobApplication.interview_dates = interview_dates;
    jobApplication.status = "interview_scheduled";
    jobApplication.modified_date = new Date();

    await jobApplication.save();
    res.status(200).json(jobApplication);
  } catch (err) {
    console.error(`Server error: ${err.message}`);
    res.status(500).json({ msg: "Server error" });
  }
};

// scheduleinverview
export const scheduleInterview = async (req, res) => {
  const { id } = req.params;
  const { interview_dates, interview_details } = req.body;

  try {
    const jobApplication = await JobApplication.findById(id);
    if (!jobApplication) {
      return res.status(404).json({ msg: "Job Application not found" });
    }

    jobApplication.status = "Interview Scheduled";
    jobApplication.interview_dates = interview_dates;
    jobApplication.interview_details = interview_details;
    jobApplication.modified_date = new Date();

    await jobApplication.save();
    res.status(200).json(jobApplication);
  } catch (err) {
    console.error(`Server error: ${err.message}`);
    res.status(500).json({ msg: "Server error" });
  }
};

// confirm interview
export const confirmInterview = async (req, res) => {
  const { id } = req.params;
  const { interview_dates, interview_details } = req.body;

  try {
    const jobApplication = await JobApplication.findById(id);
    if (!jobApplication) {
      return res.status(404).json({ msg: "Job Application not found" });
    }

    jobApplication.status = "Interview Confirmed";
    jobApplication.interview_dates = interview_dates;
    jobApplication.modified_date = new Date();

    await jobApplication.save();
    res.status(200).json(jobApplication);
  } catch (err) {
    console.error(`Server error: ${err.message}`);
    res.status(500).json({ msg: "Server error" });
  }
};

// rejectApplication
export const rejectApplication = async (req, res) => {
  const { id } = req.params;

  try {
    const jobApplication = await JobApplication.findById(id);
    if (!jobApplication) {
      return res.status(404).json({ msg: "Job Application not found" });
    }

    jobApplication.status = "Rejected";
    jobApplication.modified_date = new Date();

    await jobApplication.save();
    res.status(200).json(jobApplication);
  } catch (err) {
    console.error(`Server error: ${err.message}`);
    res.status(500).json({ msg: "Server error" });
  }
};

// approve Application
export const approveApplication = async (req, res) => {
  const { id } = req.params;

  try {
    const jobApplication = await JobApplication.findById(id);
    if (!jobApplication) {
      return res.status(404).json({ msg: "Job Application not found" });
    }

    jobApplication.status = "Approved";
    jobApplication.modified_date = new Date();

    await jobApplication.save();
    res.status(200).json(jobApplication);
  } catch (err) {
    console.error(`Server error: ${err.message}`);
    res.status(500).json({ msg: "Server error" });
  }
};
