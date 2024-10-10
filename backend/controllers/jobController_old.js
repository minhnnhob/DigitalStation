const { requireAuth } = require("../middleware/requireAuth");
const Job = require("../models/jobModel_old");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy").populate("applicants"); // Customize population as necessary
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

const getJobById = async (req, res) => {
  try {
    const  jobId  = req.params.id;
    console.log(jobId);
    const job = await Job.findById(jobId)
      .populate("postedBy")
      .populate("applicants");

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Failed to fetch job" });
  }
};

const createJob = async (req, res) => {
  try {
    const jobData = req.body;
    const newJob = new Job(jobData);
    const savedJob = await newJob.save();

    res.status(201).json({
      message: "Job created successfully",
      job: savedJob,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Failed to create job" });
  }
};

const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
      new: true,
    });

    if (!updatedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Failed to update job" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Failed to delete job" });
  }
};

// Get all jobs posted by the authenticated studio
const getJobsByStudio = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.userType !== "studio") {
      return res
        .status(403)
        .json({ message: "Only studios can access this route" });
    }

    const jobs = await Job.find({ postedBy: user._id }).populate({
      path: "applicants",
      select: "name email", // Customize the fields to populate as necessary
    });

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs by studio:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

// close job
const closeJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Ensure only the job poster can close the job
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Set job status to closed
    job.status = "closed";
    await job.save();

    res.status(200).json({ json: job.status,message: "Job successfully closed" });
  } catch (error) {
    console.error("Error closing job:", error);
    res.status(500).json({ error: "Failed to close job" });
  }
};

// reopen job
const reopenJob = async (req, res) => {
  console.log("checck");
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Ensure only the job poster can reopen the job
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Set job status to open
    job.status = "open";
    await job.save();

    res.status(200).json({status: job.status, message: "Job successfully reopened" });
  } catch (error) {
    console.error("Error reopening job:", error);
    res.status(500).json({ error: "Failed to reopen job" });
  }
};

// apply job job
const applyForJob = async (req, res) => {
  
  try {
    const { jobId } = req.params;
    const userId = req.user._id;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.status !== "open") {
      return res
        .status(400)
        .json({ message: "Job is closed for applications" });
    }

    // Check if the user has already applied
    if (job.applicants.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }

    // Add applicant to the job
    job.applicants.push(userId);

    // Check if max applicants have been reached and close the job
    if (job.applicants.length >= job.maxApplicants) {
      job.status = "filled";
    }

    await job.save();

    res.status(200).json({ message: "Application successful" });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({ error: "Failed to apply for job" });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getJobsByStudio,
  closeJob,
  reopenJob,
  applyForJob,

};
