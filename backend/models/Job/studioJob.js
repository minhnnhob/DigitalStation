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
            // console.log("this.min", this.salaryRange.min);
            return value > this.salaryRange.min;
          },
          message:
          
            "Maximum salary must be greater than or equal to minimum salary.",
        },
      },
      currency: {
        type: String,
        default: "USD",
        enum: ["USD", "EUR", "GBP", "JPY", "AUD", "VND", "Other"],
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
    next();
  });

module.exports = JobModel.discriminator("StudioJob", studioJobSchema);
