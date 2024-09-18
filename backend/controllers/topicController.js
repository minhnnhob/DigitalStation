const Topic = require("../models/topicModel");
const Artwork = require("../models/artWorkModel");

const createTopic = async (req, res) => {
  try {
    const { name, slug, tags } = req.body;

    const existingTopic = await Topic.findOne({slug: slug});

    if (existingTopic) {
      return res.status(400).json({ error: "Topic already exists" });
    }
    const newTopic = new Topic({
      name,
      slug,
      tags,
    });

    await newTopic.save();
    res.status(201).json(newTopic);
  } catch (error) {
    console.error("Error in creating topic:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

const getArtworkByTopic = async (req, res) => {
  try {
    const { slug } = req.params;
    const topic = await Topic.findOne({ slug: slug }).populate("tags", "name");
    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    const artworks = await Artwork.find({
      $or: [
        { topicId: topic._id },
        { tags: { $in: topic.tags.map((tag) => tag._id) } },
      ],
    })
      .populate("artist", "name profilePicture")
      .populate("tags", "name")
      .lean();

    res.status(200).json({
      topic: {
        name: topic.name,
        slug: topic.slug,
        imageUrl: topic.imageUrl, // Assuming you will add a field for imageUrl in your topic schema
      },
      artworks,
    });
  } catch (error) {
    console.error("Error in fetching artworks by topic:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find().populate("tags", "name slug").lean();
    res.status(200).json(topics);
  } catch (error) {
    console.error("Error fetching topics:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
module.exports = { createTopic, getArtworkByTopic, getAllTopics };
