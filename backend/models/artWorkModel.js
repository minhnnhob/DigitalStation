const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArtworkSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
    },

    files: [
      {
        fileUrl: {
          type: String,
          required: true,
        },
        fileType: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
      },
    ],
    artist: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    thumbnail: {
      type: String,
    },

    tags: [
      {
        type: String, // mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        index: true,
      },
    ],

    topic: [
      {
        type: Schema.Types.ObjectId,
        ref: "Topic", // Reference to Topics collection
        // required: true,
        index: true, // Index for fast topic lookups
      },
    ],

    likesCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    viewsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true, // Index for efficient retrieval of recent artworks
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

ArtworkSchema.index({ title: "text", description: "text" });
ArtworkSchema.index({ topic: 1 });
ArtworkSchema.index({ tags: 1 });
ArtworkSchema.index({ likesCount: -1 });
ArtworkSchema.index({ viewsCount: -1 });
ArtworkSchema.index({ createdAt: -1 });
ArtworkSchema.index({ isStaffPick: 1 });

module.exports = mongoose.model("Artwork", ArtworkSchema);
