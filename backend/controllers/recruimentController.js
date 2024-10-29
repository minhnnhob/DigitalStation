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
      .status(200)
      .json({ message: "Application submitted successfully", newRecruiment });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error in applyJob:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

const getOwnRecruitment = async (req, res) => {
  try {
    const userId = req.user._id;

    const recruitment = await Recruiment.find({ applicant: userId }).populate({
      path: "job",
      select: "status title postedBy studioId",
      populate: [
        {
          path: "studioId",
          model: "Studio", // Assuming the model name for the studio is "Studio"
          select: "name", // Select the name field from the studio
        },
        {
          path: "postedBy",
          model: "User", // Assuming the model name for the user is "User"
          select: "name", // Select the name field from the user
        },
      ],
    });
    if (!recruitment) {
      return res.status(404).json({ error: "No applications found" });
    }

    res.status(200).json(recruitment);
  } catch (error) {
    console.log("Error getting recruitment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRecruitmentById = async (req, res) => {
  const { applicationId } = req.params;
  const userId = req.user._id;

  try {
    const checkRecruitment = await Recruiment.findOne({}).select("applicant");
    if (!checkRecruitment) {
      return res.status(404).json({ error: "Application not found" });
    }

    if (checkRecruitment.applicant.toString() !== userId.toString()) {
      return res
        .status(401)
        .json({ error: "You are not authorized to view this application" });
    }

    const recruitment = await Recruiment.findById(applicationId).populate({
      path: "job",
      select: "status title postedBy studioId budget salaryRange ",
      populate: [
        {
          path: "studioId",
          model: "Studio", // Assuming the model name for the studio is "Studio"
          select: "name contactInfor  ",
        },
        {
          path: "postedBy",
          model: "User", // Assuming the model name for the user is "User"
          select: "name bud", // Select the name field from the user
        },
      ],
    });
    res.status(200).json(recruitment);
  } catch (error) {
    console.log("Error getting recruitment by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateRecruitment = async (req, res) => {
  const { applicationId } = req.params;

  const updateData = req.body;
  console.log(updateData.status);

  try {
    if (!updateData) {
      return res.status(400).json({ error: "Status is required" });
    }

    // Find the recruitment application
    const recruitment = await Recruiment.findByIdAndUpdate(
      applicationId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    // Check if the application exists
    if (!recruitment) {
      return res.status(404).json({ error: "Application not found" });
    }

    await recruitment.save();

    res.status(200).json(recruitment);
  } catch (error) {
    console.log("Error updating status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addFeedback = async (req, res) => {
  const userId = req.user._id;
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
    if(recruitment.applicant.toString() !== userId.toString()){
      return res.status(401).json({error: "You are not authorized to add feedback"});
    }
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

    recruitment.feedback = feedback;

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

    if (recruitment.applicant.toString() !== userId.toString()) {
      return res
        .status(401)
        .json({ error: "You are not authorized to confirm interview" });
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
  getRecruitmentById,

  getOwnRecruitment,
};
