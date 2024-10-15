const Recruiment = require("../models/recruitmentModel");
const User = require("../models/userModel");
const Job = require("../models/Job/JobModel");
const mongoose = require("mongoose");

const applyJob = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { jobId, coverLetter } = req.body; // Accept cover letter from request body
    let resumeVersion = req.file; // Access the uploaded resume file
    const userId = req.user._id; // Get the user ID from the authenticated user

    if (!jobId || !coverLetter) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ error: "Job ID, cover letter, and resume are required." });
    }
    // Create Job Application Document
    if (!resumeVersion) {
      resumeVersion = {};
    }

    const recuitment = await Recruiment.find({
      job: jobId,
    }).session(session);

    const recuitmentCount = recuitment.length;
    const job = await Job.findById(jobId).session(session);

    if (job.status === "closed") {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: "Job application limit reached" });
    }

    // Check if the job exists

    const recuitmentExists = await Recruiment.findOne({
      job: jobId,
      applicant: userId,
    }).session(session);

    if (recuitmentExists) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ error: "You have already applied for this job" });
    }

    const newRecruiment = new Recruiment({
      job: jobId,
      applicant: userId,
      coverLetter: coverLetter,
      status: "pending",
      resumeVersion: {
        url: resumeVersion.path, // Save the URL of the uploaded resume
        originalName: resumeVersion.originalname, // Save the original file name
      },
    });
    await newRecruiment.save({ session });

    if (recuitmentCount + 1 >= job.maxApplicants) {
      job.status = "closed";
    }

    await job.save({ session });

    await session.commitTransaction();
    session.endSession();

    res
      .status(201)
      .json({ message: "Application submitted successfully", newRecruiment });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error in applyJob:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

const updateRecruitment = async (req, res) => {
  const { applicationId } = req.params;
  const { updateStatus } = req.body;

  try {
    if (!updateStatus) {
      return res.status(400).json({ error: "Status is required" });
    }

    // Find the recruitment application
    const recruitment = await Recruiment.findById(applicationId);

    // Check if the application exists
    if (!recruitment) {
      return res.status(404).json({ error: "Application not found" });
    }

    recruitment.status = updateStatus;

    await recruitment.save();

    res.status(200).json(recruitment);
  } catch (error) {
    console.log("Error updating status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addFeedback = async (req, res) => {
  const { applicationId } = req.params;
  const { text, rating } = req.body;
  try {
    if (!text || !rating) {
      return res
        .status(400)
        .json({ error: "Feedback text and rating is required " });
    }

    // Find the recruitment application
    const recruitment = await Recruiment.findById(applicationId);

    // Check if the application exists
    if (!recruitment) {
      return res.status(404).json({ error: "Application not found" });
    }

    if (recruitment.applicant.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "You are not authorized to add feedback  " });
    }

    const feedback = {
      providedBy: req.user._id,
      text,
      rating,
    };

    recruitment.feedback.push(feedback);

    await recruitment.save();

    res.status(200).json(recruitment);
  } catch (error) {
    console.log("Error adding feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const scheduleInterview = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { applicationId } = req.params;
    const userId = req.user.id;
    const { date, type, note } = req.body;

    // Validate date and type
    if (!date || !type) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: "Date and type are required" });
    }

    // Find the recruitment application
    const recruitment = await Recruiment.findById(applicationId).session(
      session
    );

    // Check if the application exists
    if (!recruitment) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: "Application not found" });
    }

    // Add interview details to the application
    recruitment.interviews = {
      date,
      type,
      notes: note,
      recruiter: userId,
    };

    await recruitment.save({ session });
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Interview scheduled successfully",
      interviews: recruitment.interviews,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error scheduling interview:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const confirmInterview = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const userId = req.user.id;

    const recruitment = await Recruiment.findById(applicationId);

    if (!recruitment) {
      return res.status(404).json({ error: "Application not found" });
    }

    recruitment.interviews.confirmed = true;

    await recruitment.save();
    res.status(200).json({
      message: "Interview confirmed successfully",
      interviews: recruitment.interviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  applyJob,
  updateRecruitment,
  scheduleInterview,
  confirmInterview,
  addFeedback,
};
