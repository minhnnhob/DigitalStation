const Comment = require("../models/commentModel");
const Artwork = require("../models/artWorkModel");

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { userId, artworkId, comment } = req.body;

    const newComment = new Comment({
      userId,
      artworkId,
      comment,
    });

    await newComment.save();

    // Increment the comment count in the Artwork model
    await Artwork.findByIdAndUpdate(artworkId, { $inc: { commentsCount: 1 } });

    res.status(201).json({ message: "Comment added", newComment });
  } catch (error) {
    console.error("Error in creating comment:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all comments for a specific artwork
const getCommentsByArtwork = async (req, res) => {
  try {
    const { artworkId } = req.params;

    const comments = await Comment.find({ artworkId })
      .populate("userId", "name profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json({ comments });
  } catch (error) {
    console.error("Error in fetching comments:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const { commentId, artworkId } = req.body;

    // Check if comment exists
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Delete the comment
    await Comment.findByIdAndDelete(commentId);

    // Decrement the comment count in the Artwork model
    await Artwork.findByIdAndUpdate(artworkId, { $inc: { commentsCount: -1 } });

    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    console.error("Error in deleting comment:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createComment,
  getCommentsByArtwork,
  deleteComment,
};
