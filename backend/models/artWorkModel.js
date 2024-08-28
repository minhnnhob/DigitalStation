const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const artworkSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  tags: [String],
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  views: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      comment: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Artwork", artworkSchema);
