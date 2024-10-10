const mongoose = require("mongoose");
const JobModel = require("./JobModel");

const Schema = mongoose.Schema;

const studioJobSchema = new Schema(
  {
    studioId: {
      type: Schema.Types.ObjectId,
      ref: "Studio",
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    salaryRange: {
      min: {
        type: Number,
        required: true,
        min: 0, // Minimum salary must be greater than or equal to 0.
      },
      max: {
        type: Number,
        required: true,
        validate: {
          validator: function (value) {
            return value >= this.min;
          },
          message:
            "Maximum salary must be greater than or equal to minimum salary.",
        },
      },
      currency: {
        type: String,
        default: "USD",
        enum: ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "Other"],
      },
    },
  },
  { timestamps: true }
);

// Pre-save hook to ensure mutual exclusivity (optional if handled in base)
studioJobSchema.pre("save", function (next) {
    if (this.posterType !== "studio") {
      return next(new Error("posterType must be 'studio' for StudioJob."));
    }
    // Additional validations can be added here if necessary
    next();
  });

module.exports = JobModel.discriminator("StudioJob", studioJobSchema);
