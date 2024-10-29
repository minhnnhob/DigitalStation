const Job = require("../models/Job/JobModel");
const User = require("../models/userModel");
const Studio = require("../models/studioModel");

const IndividualJob = require("../models/Job/indiJob");
const StudioJob = require("../models/Job/studioJob");

const Recruitment = require("../models/recruitmentModel");

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
    let jobs;
    // console.log(req.user);
    // const { posterType } = Job.findById(req.user.id);
    
    // if (posterType === "studio") {
    //   queryFilters.posterType = "studio";
    // } else if (posterType === "artist") {
    //   queryFilters.posterType = "artist";
    // }
    jobs = await Job.find(queryFilters)
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

const getAllStudioJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = "-createdAt", ...filters } = req.query;

    // Convert array filters to use $in operator
    const queryFilters = { posterType: "studio" }; // Filter for studio jobs
    for (const key in filters) {
      if (Array.isArray(filters[key])) {
        queryFilters[key] = { $in: filters[key] };
      } else {
        queryFilters[key] = filters[key];
      }
    }

    const studioJobs = await StudioJob.find(queryFilters)
      .populate("studioId", "studioProfileImage location ")
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .exec();

    const total = await Job.countDocuments(queryFilters);

    res.status(200).json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      jobs: studioJobs,
    });
  } catch (error) {
    console.error("Error fetching studio jobs:", error);
    res.status(500).json({ error: "Unable to fetch studio jobs" });
  }
};

const getAllIndividualJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = "-createdAt", ...filters } = req.query;

    // Convert array filters to use $in operator
    const queryFilters = { posterType: "artist" }; // Filter for individual jobs
    for (const key in filters) {
      if (Array.isArray(filters[key])) {
        queryFilters[key] = { $in: filters[key] };
      } else {
        queryFilters[key] = filters[key];
      }
    }

    const individualJobs = await Job.find(queryFilters)
      .populate("postedBy", "name email")
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .exec();

    const total = await Job.countDocuments(queryFilters);

    res.status(200).json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      jobs: individualJobs,
    });
  } catch (error) {
    console.error("Error fetching individual jobs:", error);
    res.status(500).json({ error: "Unable to fetch individual jobs" });
  }
};

const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    let jobView = await Job.findById(jobId);

    console.log(jobView);

    let job;

    if (jobView.posterType === "studio") {
      job = await StudioJob.findById(jobId).populate("studioId");
    } else if (jobView.posterType === "artist") {
      job = await IndividualJob.findById(jobId).populate("posterBy", "name");
    }

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    jobView.viewCount += 1;
    await jobView.save();

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
    console.log(userType, studioId);

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

const getJobsByUser = async (req, res) => {
  try {
    const user = req.user.id;

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { userType, studioId } = await User.findById(user);

    let jobs;
    let total;
    if (userType === "artist") {
      jobs = await IndividualJob.find({ posterBy: user }).sort({ createdAt: -1 });;
      total = await IndividualJob.countDocuments({ posterBy: user });
    } else if (userType === "studio") {
      jobs = await StudioJob.find({ studioId: studioId }).sort({ createdAt: -1 });
      total = await StudioJob.countDocuments({ studioId: studioId });
    }

    if (!jobs) {
      return res.status(404).json({ error: "Jobs not found" });
    }

    const jobsWithRecruitmentCount = await Promise.all(
      jobs.map(async (job) => {
      const recruitmentCount = await Recruitment.countDocuments({ job: job._id });
      return {
        ...job.toObject(),
        recruitmentCount,
      };
      })
    );
    

    res.json({
      message: "Jobs retrieved successfully",
      total,     
      own: user,
      jobsWithRecruitmentCount,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Unable to fetch jobs" });
  }
};

const getJobAnalytics = async (req, res) => {
  try {
    const user = req.user.id;
    const jobId = req.params.id;

    const { userType, studioId } = await User.findById(user);

    let job;

    if (userType === "artist") {
      job = await IndividualJob.findOne({ posterBy: user, _id: jobId });
    } else if (userType === "studio") {
      job = await StudioJob.findOne({ studioId: studioId, _id: jobId });
    }

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const applications = await Recruitment.countDocuments({ job: jobId });
    const views = job.viewCount;

    const averageRating = await Recruitment.aggregate([
      { $match: { job: jobId } },
      { $unwind: "$feedback" },
      { $group: { _id: null, rating: { $avg: "$feedback.rating" } } },
    ]);

    const ratingCount = averageRating.length;

    let avgRating = null;

    if (ratingCount > 0) {
      avgRating = averageRating[0].rating;
    }

    res.json({
      views,
      applications,

      averageRating: avgRating,
    });
  } catch (error) {
    console.error("Error fetching job analytics:", error);
    res.status(500).json({ error: "Unable to fetch job analytics" });
  }
};

const getRecommentJobs = async (req, res) => {
  try {
    const user = req.user.id;
    const { skills } = await User.findById(user);

    const recommended = await Job.find({ skillsRequired: { $in: skills } })
      .limit(5)
      .exec();

    const jobs = await Job.find().limit(5).exec();

    res.json({
      recommended,
      // jobs,
    });
  } catch (error) {
    console.error("Error fetching recommended jobs:", error);
    res.status(500).json({ error: "Unable to fetch recommended jobs" });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getJobsByUser,

  getAllStudioJobs,
  getAllIndividualJobs,

  getJobAnalytics,
  getRecommentJobs,
};
