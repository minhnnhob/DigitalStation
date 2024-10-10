const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Validator to ensure the skills array has at least one skill
const arrayLimit = (val) => val.length > 0;

// Base Job Schema Options with Discriminator Key
const baseOptions = { discriminatorKey: "posterType", timestamps: true };

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    posterType: {
      type: String,
      enum: ["studio", "individual"],
      required: true,
    },

    topic: {
      type: String,
      enum: [
        "2D Art",
        "3D Art",
        "Animation",
        "VFX",
        "Game Design",
        "Concept Art",
        "UI/UX",
        "Other",
      ],
    },

    location: {
      type: String,
      enum: ["Remote", "On-site", "Hybrid"],
      required: true,
    },

    employmentType: {
      type: String,
      enum: ["Freelance", "Full-time", "Part-time", "Contract"],
      required: true,
    },

    skillsRequired: {
      type: [
        {
          type: String,
          trim: true,
        },
      ],
      required: true,
      validate: arrayLimit,
    },

    experienceLevel: {
      type: String,
      enum: ["Entry Level", "Mid Level", "Senior", "Lead", "Any"],
      required: true,
    },

   

    maxApplicants: {
      type: Number,
      default: 1, // Default max applicants allowed before auto-closing
    },

    status: {
      type: String,
      enum: ["open", "closed", "filled"],
      default: "open",
      index: true,
    },

    postedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.postedAt;
        },
        message: "Expiration date must be after the posting date.",
      },
    },
  },
  { timestamps: true }
);

// Index for efficient 
jobSchema.index({ jobId: 1 }, { unique: true });
jobSchema.index({ posterType: 1 });
jobSchema.index({ employmentType: 1 });
jobSchema.index({ location: 1 });
jobSchema.index({ status: 1 });

module.exports = mongoose.model("Job", jobSchema);
