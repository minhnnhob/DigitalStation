const Tag = require("../models/tagsModel");
const Topic = require("../models/topicModel");

const generateSlug = (name) => {
  if (!name || typeof name !== "string") {
    throw new Error("Invalid name provided for slug generation"); // Handle invalid input
  }

  name = name.toLowerCase().replace(/[\s/]+/g, "-"); // Convert to lowercase and replace spaces with hyphens
  return name;
};

// Create a new tag
const createTag = async (req, res) => {
  try {
    const { name } = req.body;

    const slug = generateSlug(name);

    // Check if the tag already exists
    const existingTag = await Tag.findOne({ slug });
    if (existingTag) {
      return res.json({ error: "Tag with this slug already exists." });
    } else {
      const newTag = new Tag({
        name,
        slug,
      });

      await newTag.save();
      res.status(201).json(newTag);
    }

    // Increment the tag count in the related topic
    // await Topic.findByIdAndUpdate(topicId, { $inc: { tagCount: 1 } });
  } catch (error) {
    console.error("Error creating tag:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get all tags
const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
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

    const tags = await Tag.find({ topicId })
      .populate("topicId", "name slug")
      .lean();
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

    const tag = await Tag.findOne({ slug })
      .populate("topicId", "name slug")
      .lean();
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
