const express = require("express");
const {
  getAllStudios,
  getStudio,
  updateStudios,
  getAllJobsStudio,
} = require("../controllers/StudioController");

const { requireAuth } = require("../middleware/requireAuth");

const { uploadStudio } = require("../config/cloudinary");

const router = express.Router();

// Existing routes
router.get("/", getAllStudios);
router.get("/:studioId", getStudio); // Get studio details
router.get("/:studioId/jobs", getAllJobsStudio); // Get all jobs posted by studio

router.use(requireAuth);
router.patch("/:studioId",uploadStudio, updateStudios); // Studio owner can edit

module.exports = router;
