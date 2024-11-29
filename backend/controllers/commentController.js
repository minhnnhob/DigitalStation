const Comment = require("../models/commentModel");
const Artwork = require("../models/artWorkModel");
const User = require("../models/userModel");



// Create a new comment or reply to a comment
const createComment = async (req, res) => {
  console.log("check");
  try {
    const { userId, artworkId, comment, parentId } = req.body;

    // Fetch user details and create a new comment
    const user = await User.findById(userId).select("name profilePicture");
    const newComment = new Comment({
      userId,
      artworkId,
      comment,
      parentId: parentId || null,
    });

    // Save the new comment to the database
    await newComment.save();

    // Increment the comment count in the Artwork model
    await Artwork.findByIdAndUpdate(artworkId, { $inc: { commentsCount: 1 } });

    // Structure the response to include user details within the newComment object
    const formattedComment = {
      ...newComment.toObject(),
      userId: {
        name: user.name,
        profilePicture: user.profilePicture,
      },
    };

    // Send the formatted comment as the response
    res.status(201).json({ message: "Comment added", newComment: formattedComment });
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
      .populate("parentId", "comment")
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