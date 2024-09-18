const express = require("express");
const {
  createComment,
  getCommentsByArtwork,
  deleteComment,
} = require("../controllers/commentController");

const router = express.Router();

// Add a comment to an artwork
router.post("/", createComment);

// Get all comments for an artwork
router.get("/artwork/:artworkId/", getCommentsByArtwork);

// Delete a comment
router.delete("/", deleteComment);

module.exports = router;
