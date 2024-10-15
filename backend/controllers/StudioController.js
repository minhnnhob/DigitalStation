const Studio = require("../models/studioModel");
const Job = require("../models/Job/JobModel");
const studioJob = require("../models/Job/studioJob");
const express = require("express");

const getAllStudios = async (req, res) => {
  try {
    const { industry, location } = req.query;

    const query = {};
    if (industry) query.industry = { $in: industry.split(",") };
    if (location) query.location = location;

    const studios = await Studio.find(query);
    console.log(studios);
    res.status(200).json(studios);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch studios" });
  }
};

const getStudio = async (req, res) => {
  try {
    const { studioId } = req.params; // Extract studioId from the request parameters

    // Find the studio by its ID and populate the employees array with employee details
    const studio = await Studio.findById(studioId);

    if (!studio) {
      return res.status(404).json({ error: "Studio not found" });
    }

    res.status(200).json(studio); // Return the studio details
  } catch (error) {
    console.error("Error fetching studio details:", error);
    res.status(500).json({ error: "Unable to fetch studio details" });
  }
};

const updateStudios = async (req, res) => {
  try {
    const { studioId } = req.params;
    const userId = req.user.id; // Assume the user ID is retrieved from authentication middleware
    const studio = await Studio.findById(studioId);
    const studioData = req.body;

    if (req.files) {
      if (req.files.studioProfileImage) {
        studioData.studioProfileImage = req.files.studioProfileImage[0].path;
      }

      if (req.files.backgroundImage) {
        studioData.backgroundImage = req.files.backgroundImage[0].path;
      }
    }

    // Check if the user is the studio admin
    if (studio.studioAdminId.toString() !== userId) {
      return res
        .status(401)
        .json({ error: "You are not authorized to edit this studio" });
    }

    Object.assign(studio, studioData); // Update the studio with the request body fields
    await studio.save();

    res.status(200).json(studio);
  } catch (error) {
    res.status(500).json({ error: "Unable to update studio" });
  }
};

const getAllJobsStudio = async (req, res) => {
  try {
    const { studioId } = req.params; // Extract studioId from the request parameters
    // Find all jobs posted by this studio
    const jobs = await studioJob.find({ studioId: studioId });
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ error: "No jobs found for this studio" });
    }

    res.status(200).json(jobs); // Return the list of jobs posted by the studio
  } catch (error) {
    console.error("Error fetching jobs of studio:", error);
    res.status(500).json({ error: "Unable to fetch jobs of this studio" });
  }
};

module.exports = {
  getAllStudios,
  getStudio,
  updateStudios,
  getAllJobsStudio,
};
