const Tag = require("../models/tagsModel");
const Topic = require("../models/topicModel");

// Create a new tag
const createTag = async (req, res) => {
  try {
    const { name, slug, topicId } = req.body;

    // Check if the tag already exists
    const existingTag = await Tag.findOne({ slug });
    if (existingTag) {
      return res.status(400).json({ error: "Tag with this slug already exists." });
    }

    // Ensure the topic exists
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ error: "Topic not found." });
    }

    const newTag = new Tag({
      name,
      slug,
      topicId,
    });

    await newTag.save();

    // Increment the tag count in the related topic
    await Topic.findByIdAndUpdate(topicId, { $inc: { tagCount: 1 } });

    res.status(201).json(newTag);
  } catch (error) {
    console.error("Error creating tag:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get all tags
const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find().populate("topicId", "name slug").lean();
    res.status(200).json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get tags by topic
const getTagsByTopic = async (req, res) => {
  try {
    const { topicId } = req.params;

    const tags = await Tag.find({ topicId }).populate("topicId", "name slug").lean();
    if (!tags.length) {
      return res.status(404).json({ error: "No tags found for this topic." });
    }

    res.status(200).json(tags);
  } catch (error) {
    console.error("Error fetching tags by topic:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get a single tag by slug
const getTagBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const tag = await Tag.findOne({ slug }).populate("topicId", "name slug").lean();
    if (!tag) {
      return res.status(404).json({ error: "Tag not found." });
    }

    res.status(200).json(tag);
  } catch (error) {
    console.error("Error fetching tag by slug:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  createTag,
  getAllTags,
  getTagsByTopic,
  getTagBySlug,
};
