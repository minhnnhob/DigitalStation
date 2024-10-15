const Recruiment = require("../models/recruitmentModel");
const User = require("../models/userModel");

const applyJob = async (req, res) => {

  try {
    const user = req.user.id;
    console.log(req.body);    
    const {userType} = await User.findById(user);
   

    if(userType !== "artist") {
      res.status(400).json({message: "Only art can apply for jobs"});
    }

    // const { jobId, coverLetter, resumeVersion } = req.body;
    

    // const recruiment = new Recruiment({
    //   job: jobId,
    //   applicant: user,
    //   coverLetter,
    //   // resumeVersion,
    // });
    // await recruiment.save();
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatewStatus = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addNotes = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addInterviewFeedback = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const scheduleInterview = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const confirmInterview = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const autoCloseJob = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  applyJob,
  updatewStatus,
  addNotes,
  addInterviewFeedback,
  scheduleInterview,
  confirmInterview,
  autoCloseJob,
};
