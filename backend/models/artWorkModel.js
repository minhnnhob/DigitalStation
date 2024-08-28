const mongoose = require("mongoose");

const ArtworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
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
    },
  ],
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
});

module.exports = mongoose.model("Artwork", ArtworkSchema);
