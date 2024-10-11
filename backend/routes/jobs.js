// const express = require("express");
// const router = express.Router();
// const {
//   createJob,
//   updateJob,
//   deleteJob,
//   getAllJobs,
//   getJobById,
//   getJobsByStudio,
//   closeJob,
//   reopenJob,
//   applyForJob,
// } = require("../controllers/jobController_old");
// const { requireAuth } = require("../middleware/requireAuth");

// // get jobs by studio
// router.get("/studio", requireAuth, getJobsByStudio);

// // router.post("/:jobId/apply", requireAuth, applyForJob);

// // router.patch("/reopen/:jobId", requireAuth, reopenJob);

// // router.patch("/close/:jobId", requireAuth, closeJob);

// //get all getAllJobs
// router.get("/", getAllJobs);
// //get job by id
// router.get("/:id", getJobById);

// // router.use(requireAuth);

// //create job
// router.post("/", createJob);

// //update job
// router.patch("/:id", updateJob);

// //delete job
// router.delete("/:id", deleteJob);

// module.exports = router;

const express = require("express");

const { requireAuth } = require("../middleware/requireAuth");

const { getAllJobs, getJobById, createJob, updateJob } = require("../controllers/jobController");


const router = express.Router();

// list all jobs


router.get("/", getAllJobs);

router.get("/:id", getJobById);


router.use(requireAuth);

// create job
router.post("/",createJob);
router.patch("/:id",updateJob);

module.exports = router;
