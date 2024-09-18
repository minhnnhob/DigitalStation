const express = require("express");
const router = express.Router();
const { createTag, getAllTags, getTagsByTopic, getTagBySlug } = require("../controllers/tagController");

// Create a new tag
router.post("/", createTag);

// Get all tags
router.get("/", getAllTags);

// Get tags by topic
router.get("/topic/:topicId", getTagsByTopic);

// Get a single tag by slug
router.get("/:slug", getTagBySlug);

module.exports = router;
