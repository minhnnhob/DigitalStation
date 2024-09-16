const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  artworkCount: {
    type: Number,
    default: 0,
  },
  topicId: {
    type: Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Tag", tagSchema);
