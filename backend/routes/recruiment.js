const express = require('express');
const router = express.Router();

const {
  submitApplication,
  updateApplicationStatus,
  addRecruiterNotes,
  scheduleInterview,
  addInterviewFeedback,
  updateJobStatus,
  getRecruitmentByJob,
} = require('../controllers/recruimentController');

// Middleware to check if the user is authenticated (Assuming you have auth middleware)
const { requireAuth } = require('../middleware/requireAuth');
// get all recruitment of job
router.get('/job/:jobId', requireAuth, getRecruitmentByJob);
// Route to submit a job application
router.post('/apply', requireAuth, submitApplication);

// Route to update application status
router.put('/status', requireAuth, updateApplicationStatus);

// Route to add recruiter notes to an application
router.patch('/notes', requireAuth, addRecruiterNotes);

// Route to schedule an interview
router.patch('/schedule-interview', requireAuth, scheduleInterview);

// Route to add interview feedback
router.patch('/feedback', requireAuth, addInterviewFeedback);

// Route to manually close or reopen a job
router.patch('/job-status', requireAuth, updateJobStatus);

module.exports = router;
