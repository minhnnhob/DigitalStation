const express = require("express");

const {
  applyJob,
  updatewStatus,
  addNotes,
  addInterviewFeedback,
  scheduleInterview,
  confirmInterview,
  autoCloseJob,
} = require("../controllers/recruimentController");

const router = express.Router();

// Middleware to check if the user is authenticated (Assuming you have auth middleware)
const { requireAuth } = require('../middleware/requireAuth');



router.use(requireAuth);

router.post('/apply', applyJob);
router.patch('applications/:applicationId/updateStatus', updatewStatus);
router.patch('applications/:applicationId/addNotes', addNotes);
router.patch('applications/:applicationId/addInterviewFeedback', addInterviewFeedback);
router.post('applications/:applicationId/scheduleInterview', scheduleInterview);
router.patch('applications/:applicationId/confirmInterview', confirmInterview);
router.post('applications/:applicationId/autoCloseJob', autoCloseJob);

module.exports = router;
