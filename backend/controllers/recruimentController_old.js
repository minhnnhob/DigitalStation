// const Recruitment = require("../models/recruitmentModel");
// const User = require("../models/userModel");
// const Job = require("../models/");
// const mongoose = require("mongoose");

// //get all recruitment of job
// const getRecruitmentByJob = async (req, res) => {
//   try {
//     const { jobId } = req.params;

//     // Check if the job exists
//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({ message: "Job not found" });
//     }

//     // Fetch all recruitment applications for the given job
//     const recruitments = await Recruitment.find({ job: jobId })
//       .populate({
//         path: "applicant",
//         select: "name email", // Customize fields as necessary
//       })
//       .populate({
//         path: "recruiter",
//         select: "name email", // Customize fields as necessary
//       })
//       .populate({
//         path: "feedback.providedBy",
//         select: "name email", // Customize fields as necessary
//       });

//     if (recruitments.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No applications found for this job" });
//     }

//     res.status(200).json(recruitments);
//   } catch (error) {
//     console.error("Error fetching recruitments by job:", error);
//     res.status(500).json({ error: "Failed to fetch recruitment applications" });
//   }
// };
// //get all recruitment job of studio
// // const getRecruitmentByStudio = async (req, res) => {
// //     try {
// //         // Assuming req.user._id is the ID of the currently logged-in studio
// //         const { studioId } = req.params;

// //         // Fetch jobs posted by the studio
// //         const jobs = await Job.find({ postedBy: studioId, posterType: 'studio' });

// //         if (jobs.length === 0) {
// //           return res.status(404).json({ message: "No jobs found for this studio" });
// //         }

// //         // Extract job IDs
// //         const jobIds = jobs.map(job => job._id);

// //         // Fetch recruitment applications for the jobs posted by the studio
// //         const recruitments = await Recruitment.find({ job: { $in: jobIds } })
// //           .populate({
// //             path: 'job',
// //             select: 'title', // Customize fields as necessary
// //           })
// //           .populate({
// //             path: 'applicant',
// //             select: 'name email', // Customize fields as necessary
// //           })
// //           .populate({
// //             path: 'recruiter',
// //             select: 'name email', // Customize fields as necessary
// //           });

// //         if (recruitments.length === 0) {
// //           return res.status(404).json({ message: "No applications found for this studio's jobs" });
// //         }

// //         res.status(200).json(recruitments);
// //       } catch (error) {
// //         console.error("Error fetching recruitments by studio:", error);
// //         res.status(500).json({ error: "Failed to fetch recruitment applications" });
// //       }
// // };

// // Submit an application for a job
// const submitApplication = async (req, res) => {
//   try {
//     const { jobId, coverLetter, resumeVersion } = req.body;
//     const applicantId = req.user._id;

//     // Check if the job exists
//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({ message: "Job not found" });
//     }

//     // Check if the applicant exists
//     const applicant = await User.findById(applicantId);
//     if (!applicant) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (applicant.role !== "artist") {
//       return res
//         .status(400)
//         .json({ message: "Only artists can apply for jobs" });
//     }

//     const recruiterId = job.postedBy;

//     const newApplication = new Recruitment({
//       job: jobId,
//       applicant: applicantId,
//       coverLetter,
//       resumeVersion,
//       recruiter: recruiterId, // Assuming recruiter ID is passed in the request
//     });

//     const savedApplication = await newApplication.save();

//     res
//       .status(201)
//       .json({
//         json: newApplication,
//         message: "Application submitted successfully",
//         application: savedApplication,
//       });
//   } catch (error) {
//     console.error("Error submitting application:", error);
//     res.status(500).json({ message: "Failed to submit application" });
//   }
// };

// // Update an existing application
// const updateApplicationStatus = async (req, res) => {
//   try {
//     const { applicationId, status } = req.body;

//     // Validate status
//     const validStatuses = [
//       "pending",
//       "reviewing",
//       "shortlisted",
//       "rejected",
//       "hired",
//     ];
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({ message: "Invalid status" });
//     }

//     // Check if the application exists
//     const application = await Recruitment.findById(applicationId);
//     if (!application) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     application.status = status;
//     const updatedApplication = await application.save();

//     res.status(200).json({
//       message: "Application status updated successfully",
//       application: updatedApplication,
//     });
//   } catch (error) {
//     console.error("Error updating application status:", error);
//     res.status(500).json({ message: "Failed to update application status" });
//   }
// };

// //Add Recruiter Notes
// const addRecruiterNotes = async (req, res) => {
//   try {
//     const { applicationId, notes } = req.body;

//     // Check if the application exists
//     const application = await Recruitment.findById(applicationId);
//     if (!application) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     application.recruiterNotes = notes;
//     const updatedApplication = await application.save();

//     res.status(200).json({
//       message: "Recruiter notes added successfully",
//       application: updatedApplication,
//     });
//   } catch (error) {
//     console.error("Error adding recruiter notes:", error);
//     res.status(500).json({ message: "Failed to add recruiter notes" });
//   }
// };

// //Schedule an Interview
// const scheduleInterview = async (req, res) => {
//   try {
//     const { applicationId, date, type, notes } = req.body;

//     // Check if the application exists
//     const application = await Recruitment.findById(applicationId);
//     if (!application) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     application.interviews.push({ date, type, notes });
//     const updatedApplication = await application.save();

//     res.status(200).json({
//       message: "Interview scheduled successfully",
//       application: updatedApplication,
//     });
//   } catch (error) {
//     console.error("Error scheduling interview:", error);
//     res.status(500).json({ message: "Failed to schedule interview" });
//   }
// };

// // add interview feedback
// const addInterviewFeedback = async (req, res) => {
//   try {
//     const { applicationId, feedbackText, rating } = req.body;
//     const feedbackProvider = req.user._id;

//     // Check if the application exists
//     const application = await Recruitment.findById(applicationId);
//     if (!application) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     application.feedback.push({
//       providedBy: feedbackProvider,
//       text: feedbackText,
//       rating,
//     });

//     const updatedApplication = await application.save();

//     res.status(200).json({
//       message: "Feedback added successfully",
//       application: updatedApplication,
//     });
//   } catch (error) {
//     console.error("Error adding feedback:", error);
//     res.status(500).json({ message: "Failed to add feedback" });
//   }
// };

// //auto close job when max applicants reached
// const autoCloseJob = async (jobId, maxApplicants) => {
//   try {
//     const job = await Job.findById(jobId).populate("applicants");

//     if (!job) {
//       throw new Error("Job not found");
//     }

//     if (job.applicants.length >= maxApplicants) {
//       job.status = "closed";
//       await job.save();
//     }
//   } catch (error) {
//     console.error("Error auto-closing job:", error);
//   }
// };

// // manually close a or reopen job
// const updateJobStatus = async (req, res) => {
//   try {
//     const { jobId, status } = req.body;

//     // Validate status
//     if (!["open", "closed"].includes(status)) {
//       return res.status(400).json({ message: "Invalid status" });
//     }

//     // Check if the job exists
//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({ message: "Job not found" });
//     }

//     job.status = status;
//     const updatedJob = await job.save();

//     res.status(200).json({
//       message: `Job status updated to ${status}`,
//       job: updatedJob,
//     });
//   } catch (error) {
//     console.error("Error updating job status:", error);
//     res.status(500).json({ message: "Failed to update job status" });
//   }
// };

// module.exports = {
//   submitApplication,
//   updateApplicationStatus,
//   addRecruiterNotes,
//   scheduleInterview,
//   addInterviewFeedback,
//   autoCloseJob,
//   updateJobStatus,
//   getRecruitmentByJob,
// };
