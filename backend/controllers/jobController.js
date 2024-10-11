const Job = require("../models/Job/JobModel");
const User = require("../models/userModel");
const Studio = require("../models/studioModel");

const IndividualJob = require("../models/Job/indiJob");
const StudioJob = require("../models/Job/studioJob");

const getAllJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = "-createdAt", ...filters } = req.query;

    // Convert array filters to use $in operator
    const queryFilters = {};
    for (const key in filters) {
      if (Array.isArray(filters[key])) {
        queryFilters[key] = { $in: filters[key] };
      } else {
        queryFilters[key] = filters[key];
      }
    }
    console.log(queryFilters);
    const jobs = await Job.find(queryFilters)
      .populate("postedBy", "name email")
      // .populate('applicants', 'name email')
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .exec();

    const total = await Job.countDocuments(filters);

    res.status(200).json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Unable to fetch jobs" });
  }
};

const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId)
      .populate("postedBy", "name email")
      // .populate('applicants', 'name email')
      .exec();

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Unable to fetch job" });
  }
};

const createJob = async (req, res) => {
  try {
    const jobData = req.body;
    const user = req.user;
    const { userType, studioId } = await User.findById(user);

    let job;

    if (userType === "artist") {
      job = new IndividualJob({
        ...jobData,
        posterType: userType,
        posterBy: user,
      });
    } else if (userType === "studio") {
      job = new StudioJob({
        ...jobData,
        posterType: userType,
        studioId: studioId,
      });
    } else {
      return res.status(400).json({ error: "User type not found" });
    }
    await job.save();

    res.status(201).json({
      message: "Job created successfully",
      job: job,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Unable to create job" });
  }
};

const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const jobData = req.body;

    const user = req.user.id;
    const { userType, studioId } = await User.findById(user);
    // console.log(user);

    let updatedJob;
    if (userType === "artist") {
      updatedJob = await IndividualJob.findById(jobId);

      if (!updatedJob) {
        return res.status(404).json({ error: "Job not found" });
      }

      if (updatedJob.posterBy != user) {
        return res
          .status(401)
          .json({ error: "You are not authorized to update this job" });
      }

      Object.assign(updatedJob, jobData);

      await updatedJob.save();
    } else if (userType === "studio") {
      updatedJob = await StudioJob.findById(jobId);
      if (updatedJob.studioId.toString() !== studioId.toString()) {
        return res
          .status(401)
          .json({ error: "You are not authorized to update this job" });
      }

      if (!updatedJob) {
        return res.status(404).json({ error: "Job not found" });
      }
      Object.assign(updatedJob, jobData);

      await updatedJob.save();
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
    const jobId = req.params.id;

    const user = req.user.id;

    const { userType, studioId } = await User.findById(user);

    let deletedJob;

    if (userType === "artist") {
      deletedJob = await IndividualJob.findById(jobId);

      if (deletedJob.posterBy != user) {
        return res
          .status(401)
          .json({ error: "You are not authorized to delete this job" });
      }
      if (!deletedJob) {
        return res.status(404).json({ error: "Job not found" });
      }

      await deletedJob.deleteOne();
    } else if (userType === "studio") {
      deletedJob = await StudioJob.findById(jobId);

      if (deletedJob.studioId.toString() != studioId.toString()) {
        return res
          .status(401)
          .json({ error: "You are not authorized to delete this job" });
      }
      if (!deletedJob) {
        return res.status(404).json({ error: "Job not found" });
      }

      await deletedJob.deleteOne();
    }

    res.json({
      message: "Job deleted successfully",
      jobId: jobId,
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Failed to delete job" });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
