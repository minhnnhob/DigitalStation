const mongoose = require("mongoose");

const recruitmentSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "reviewing", "shortlisted", "rejected", "hired"],
      default: "pending",
    },
    coverLetter: String, // The cover letter provided by the applicant
    resumeVersion: String, // URL or identifier for the version of the resume used for this application
    recruiterNotes: String, // Internal notes added by the recruiter regarding the candidate
    interviews: [
      {
        date: Date, // Date of the interview
        type: {
          type: String,
          enum: ["phone", "video", "inPerson"],
        }, // Interview type: phone, video, or in-person
        notes: String, // Notes from the interview
      },
    ],
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // The recruiter handling the application
    feedback: [
      {
        providedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        }, // Feedback provider (e.g., interviewer)
        text: String, // Feedback text
        rating: { type: Number, min: 1, max: 5 }, // Optional rating system for candidates
        date: { type: Date, default: Date.now }, // Feedback date
      },
    ],
    appliedAt: {
      type: Date,
      default: Date.now,
    }, // When the application was submitted
  },
  { timestamps: true }
);

recruitmentSchema.index({ job: 1, applicant: 1, status: 1 });

module.exports = mongoose.model("Recruitment", recruitmentSchema);
