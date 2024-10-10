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
    studioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Studio",
      required: function () {
        return this.posterType === "studio";
      },
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
      // For individual posters
      type: Number,
      required: function () {
        return this.posterType === "individual";
      },
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: "Budget must be a positive number.",
      },
    },

    salaryRange: {
      min: {
        type: Number,
        required: function () {
          return this.posterType === "studio";
        },
        validate: {
          validator: function (value) {
            return value >= 0;
          },
          message: "Minimum salary must be a positive number.",
        },
      },
      max: {
        type: Number,
        required: function () {
          return this.posterType === "studio";
        },
        validate: {
          validator: function (value) {
            return value >= this.salaryRange.min;
          },
          message:
            "Maximum salary must be greater than or equal to minimum salary.",
        },
      },
      currency: {
        type: String,
        default: "USD",
      },
    },

    maxApplicants: {
      type: Number,
      default: 1, // Default max applicants allowed before auto-closing
    },

    status: {
      type: String,
      enum: ["open", "closed", "filled"],
      default: "open",
    },

    postedAt: {
      type: Date,
      default: Date.now,
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

// Optional: Pre-save hook to handle posterType consistency
jobSchema.pre("save", function (next) {
  if (this.posterType === "studio" && !this.studioId) {
    return next(new Error("studioId is required for studio posters."));
  }
  if (this.posterType === "individual" && !this.postedBy) {
    return next(new Error("postedBy is required for individual posters."));
  }
  next();
});

module.exports = mongoose.model("Job", jobSchema);
