const express = require("express");

const router = express.Router();

const {
  createTopic,
  getArtworkByTopic,
  getAllTopics,
  deleteTopicById,
  updateTopic,
} = require("../controllers/topicController");


const { uploadTopic } = require("../config/cloudinary");

router.post("/", uploadTopic, createTopic);

router.put("/:id", uploadTopic, updateTopic);

router.get("/:slug", getArtworkByTopic);

router.get("/", getAllTopics);

router.delete("/:id", deleteTopicById);
module.exports = router;
