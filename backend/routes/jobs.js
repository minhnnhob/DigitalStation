const express = require("express");

const { requireAuth } = require("../middleware/requireAuth");

const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getJobsByUser,
  getAllStudioJobs,
  getAllIndividualJobs,
  getJobAnalytics,
  getRecommentJobs
} = require("../controllers/jobController");

const router = express.Router();

// list all jobs

router.get("/", getAllJobs);
router.get("/jobByStudio/",getAllStudioJobs);
router.get("/jobByIndividual/",getAllIndividualJobs);

router.get("/:id", getJobById);

router.use(requireAuth);

// create job
router.post("/", createJob);
router.patch("/:id", updateJob);
router.delete("/:id", deleteJob);
router.get("/owned/Jobs", getJobsByUser);

router.get("/analytics/:id", getJobAnalytics);

router.get("/recommentJobs/jobs",getRecommentJobs)

module.exports = router;
