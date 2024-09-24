const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: function () {
        return this.posterType === "studio";
      },
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "freelance", "commission"],
      required: true,
    },
    Topic: {
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
      // required: true,
    },
    skillsRequired: [
      {
        type: String,
        trim: true,
      },
    ],
    experienceLevel: {
      type: String,
      enum: ["Entry Level", "Mid Level", "Senior", "Lead", "Any"],
      required: true,
    },
    budget: {
      type: Number,
      required: function () {
        return this.posterType === "individual";
      },
    },
    salary: {
      min: {
        type: Number,
        required: function() { return this.posterType === 'studio'; }
      },
      max: {
        type: Number,
        required: function() { return this.posterType === 'studio'; }
      },
      currency: {
        type: String,
        default: 'USD'
      }
    },
    applicationDeadline: {
      type: Date,
    },

    maxApplicants: {
      type: Number,
      default: 1, // Default max applicants allowed before auto-closing
    },

    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["open", "closed", "filled"],
      default: "open",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
