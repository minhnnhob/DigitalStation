const e = require("express");
const mongoose = require("mongoose");

const userActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },

  artworkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artwork",
    required: true,
    index: true,
  },

  followedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },

  activityType: {
    type: String,
    enum: ["like", "view", "comment", "follow"],
    required: true,
    index: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    index: true, // Index for efficient retrieval of recent artworks
  },
});

userActivitySchema.index(
  { userId: 1, artworkId: 1, activityType: 1 },
  { unique: true }
);

module.exports = mongoose.model("UserActivity", userActivitySchema);
