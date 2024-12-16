const Like = require("../models/likeModel");
const Artwork = require("../models/artWorkModel");
const { logUserActivity } = require("./userActivityController");

// Like an artwork
const likeArtwork = async (req, res) => {
  try {
    const { userId, artworkId } = req.body;

    // Check if the user already liked the artwork
    const existingLike = await Like.findOne({ userId, artworkId });
    if (existingLike) {
      return res
        .status(400)
        .json({ message: "You have already liked this artwork" });
    }

    // Create a new like
    const like = new Like({
      userId,
      artworkId,
    });

    await like.save();
    // Log the like activity
    await logUserActivity(userId, artworkId, "like");

    // Increment the like count in the Artwork model
    await Artwork.findByIdAndUpdate(artworkId, { $inc: { likesCount: 1 } });

    res.status(201).json({ message: "Artwork liked", like });
  } catch (error) {
    console.error("Error in liking artwork:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Unlike an artwork
const unlikeArtwork = async (req, res) => {
  try {
    const { userId, artworkId } = req.body;

    // Check if the like exists
    const existingLike = await Like.findOne({ userId, artworkId });
    if (!existingLike) {
      return res
        .status(400)
        .json({ message: "You haven't liked this artwork yet" });
    }

    // Remove the like
    await Like.findByIdAndDelete(existingLike._id);

    // Decrement the like count in the Artwork model
    await Artwork.findByIdAndUpdate(artworkId, { $inc: { likesCount: -1 } });

    res.status(200).json({ message: "Artwork unliked" });
  } catch (error) {
    console.error("Error in unliking artwork:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all likes for a specific artwork
const getLikesByArtwork = async (req, res) => {
  try {
    const { artworkId } = req.params;

    const likes = await Like.find({ artworkId }).populate(
      "userId",
      "name profilePicture"
    );

    res.status(200).json({ likes });
  } catch (error) {
    console.error("Error in fetching likes:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  likeArtwork,
  unlikeArtwork,
  getLikesByArtwork,
};
