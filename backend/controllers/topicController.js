const Topic = require("../models/topicModel");
const Artwork = require("../models/artWorkModel");
const Tag = require("../models/tagsModel");

const createTopic = async (req, res) => {
  try {
    const { name, slug, tags, description } = req.body;

    console.tag

    // Handle image upload
    let imageUrl = "";
    if (req.files && req.files.imageUrl) {
      imageUrl = req.files.imageUrl[0].path; // Cloudinary URL or local file path
    }

    // Check if a topic with the same slug already exists
    const existingTopic = await Topic.findOne({ slug });
    if (existingTopic) {
      return res.status(400).json({ error: "Topic already exists" });
    }

    let tagIds = [];
    if (Array.isArray(tags) && tags.length > 0) {
      const tagsList = await Tag.find({ name: { $in: tags } }).select("_id");
      tagIds = tagsList.map((tag) => tag._id);
    }

    // Find and map tags to their IDs
    const tagsList = await Tag.find({ name: { $in: tags } }).select("_id");

    // Create the new topic
    const newTopic = new Topic({
      name,
      slug,
      tags: tagIds, // Save tags as an array of IDs
      description,
      imageUrl,
    });

    await newTopic.save();
    res.status(201).json(newTopic);
  } catch (error) {
    console.error("Error in creating topic:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

const updateTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, tags, description } = req.body;

    // Handle image upload
    let imageUrl = "";
    if (req.files && req.files.imageUrl) {
      imageUrl = req.files.imageUrl[0].path; // Cloudinary URL or local file path
    }

    // Check if a topic with the same slug already exists (excluding the current topic)
    const existingTopic = await Topic.findOne({ slug, _id: { $ne: id } });
    if (existingTopic) {
      return res.status(400).json({ error: "Topic with this slug already exists" });
    }

    let tagIds = [];
    if (Array.isArray(tags) && tags.length > 0) {
      const tagsList = await Tag.find({ name: { $in: tags } }).select("_id");
      tagIds = tagsList.map((tag) => tag._id);
    }

    // Find the topic by ID and update it
    const updatedTopic = await Topic.findByIdAndUpdate(
      id,
      {
        name,
        slug,
        tags: tagIds, // Save tags as an array of IDs
        description,
        ...(imageUrl && { imageUrl }), // Only update imageUrl if a new image is provided
      },
      { new: true, runValidators: true }
    );

    if (!updatedTopic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    res.status(200).json(updatedTopic);
  } catch (error) {
    console.error("Error in updating topic:", error);
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

const deleteTopicById = async (req, res) => {
  try {
    const { id } = req.params;

    const topic = await Topic.findById(id);
    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }
    await Topic.findByIdAndDelete(id);
    res.status(200).json({ message: "Topic deleted successfully" });
  } catch (error) {
    console.error("Error in deleting topic:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
module.exports = {
  createTopic,
  getArtworkByTopic,
  getAllTopics,
  deleteTopicById,
  updateTopic,
};
