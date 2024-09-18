const Follower = require("../models/followersModel");
const User = require("../models/userModel"); // Assuming you have a User model

const followUser = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    // Check if the follower is trying to follow themselves
    if (followerId === followingId) {
      return res.status(400).json({ error: "You cannot follow yourself." });
    }

    // Check if the follow relationship already exists
    const existingFollow = await Follower.findOne({ followerId, followingId });
    if (existingFollow) {
      return res
        .status(400)
        .json({ error: "You are already following this user." });
    }

    // Create a new follow relationship
    const follow = new Follower({
      followerId,
      followingId,
    });

    await follow.save();
    res
      .status(201)
      .json({ message: "Successfully followed the user.", follow });
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    const follow = await Follower.findOneAndDelete({ followerId, followingId });

    if (!follow) {
      return res
        .status(404)
        .json({ error: "You are not following this user." });
    }

    res.status(200).json({ message: "Successfully unfollowed the user." });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const followers = await Follower.find({ followingId: userId }).populate(
      "followerId",
      "name profilePicture"
    );
    if (!followers) {
      return res.status(404).json({ error: "No followers found." });
    }
    res.status(200).json(followers);
  } catch (error) {
    console.error("Error fetching followers:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;

    const following = await Follower.find({ followerId: userId }).populate(
      "followingId",
      "name profilePicture"
    );
    if (!following) {
      return res.status(404).json({ error: "No following found." });
    }

    res.status(200).json(following);
  } catch (error) {
    console.error("Error fetching following:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};
