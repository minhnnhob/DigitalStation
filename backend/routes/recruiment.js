const express = require("express");
const {
  applyJob,
  updateRecruitment,
  addFeedback,
  scheduleInterview,
  confirmInterview,
  getOwnRecruitment

} = require("../controllers/recruimentController");
const { upload } = require("../config/cloudinary");

const router = express.Router();

// Middleware to check if the user is authenticated (Assuming you have auth middleware)
const { requireAuth } = require('../middleware/requireAuth');



router.use(requireAuth);

router.post('/apply',upload.single("resumeVersion"), applyJob);
router.patch('/:applicationId/updateStatus', updateRecruitment);
router.patch('/:applicationId/addInterviewFeedback', addFeedback);
router.post('/:applicationId/scheduleInterview', scheduleInterview);
router.patch('/:applicationId/confirmInterview', confirmInterview);
router.get('/my_recuitment', getOwnRecruitment);

module.exports = router;
