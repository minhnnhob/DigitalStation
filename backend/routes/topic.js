const express = require("express");

const router = express.Router();

const {
  createTopic,
  getArtworkByTopic,
  getAllTopics,
} = require("../controllers/topicController");

router.post("/", createTopic);

router.get("/:slug", getArtworkByTopic);

router.get("/", getAllTopics);
module.exports = router;
