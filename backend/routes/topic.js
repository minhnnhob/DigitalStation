const express = require("express");

const router = express.Router();

const {
  createTopic,
  getArtworkByTopic,
  getAllTopics,
  deleteTopicById,
} = require("../controllers/topicController");

router.post("/", createTopic);

router.get("/:slug", getArtworkByTopic);

router.get("/", getAllTopics);

router.delete("/:id", deleteTopicById);
module.exports = router;
