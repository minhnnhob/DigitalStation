const UserActivity = require("../models/userActivityModel");

const logUserActivity = async (userId, artworkId, activityType, followedUserId = null) => {
  try {
    const activity = new UserActivity({
      userId,
      artworkId,
      activityType,
      followedUserId,
    });
    await activity.save();
    console.log("User activity logged:", activity);
  } catch (error) {
    console.error("Error logging user activity:", error.message);
  }
};

module.exports = {
  logUserActivity,
};