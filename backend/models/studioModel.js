const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studioSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    studioAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    description: {
      type: String,
    },

    studioProfileImage: {
      type: String,
    },

    backgroundImage: {
      type: String,
    },

    industry: [
      {
        type: String,
        required: true,
      },
    ],

    website: {
      type: String,
    },

    location: {
      type: String,
    },

    foundedDate: {
      type: Date,
    }, // The date the studio was founded

    socialLinks: [
      {
        platform: String,
        url: String,
      },
    ],

    contactInfor: {
      email: {
        type: String,
        trim: true,
        lowercase: true,
      },
      phone: {
        type: String,
        trim: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Studio", studioSchema);
