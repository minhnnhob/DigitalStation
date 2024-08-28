const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  artworkCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Tag", tagSchema);
