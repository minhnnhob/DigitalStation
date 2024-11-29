const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const topicSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      // required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      // required: true,  // Add image field for each topic
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Topic", topicSchema);
