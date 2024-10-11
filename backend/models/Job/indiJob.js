const mongoose = require("mongoose");
const JobModel = require("./JobModel");

const Schema = mongoose.Schema;

const indiJobSchema = new Schema(
  {
    posterBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    budget: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "USD",
      enum: ["USD", "EUR", "GBP", "JPY", "AUD", "VND", "Other"],
    },
  },
  {
    timestamps: true,
  }
);

indiJobSchema.pre("save", function (next) {
    if (this.posterType !== "artist") {
      return next(new Error("posterType must be 'individual' for IndividualJob."));
    }
    // Additional validations can be added here if necessary
    next();
  });

module.exports = JobModel.discriminator("IndividualJob", indiJobSchema);
