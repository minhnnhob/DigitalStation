const Artwork = require("../models/artWorkModel");
const Topic = require("../models/topicModel");
const User = require("../models/userModel");
const Tag = require("../models/tagsModel");
const UserActivity = require("../models/userActivityModel");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const mongoose = require("mongoose");

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = "artworks"; // Default folder

    if (file.mimetype.startsWith("image/")) {
      folder = "image";
    } else if (file.mimetype.startsWith("video/")) {
      folder = "video";
    }

    return {
      folder: folder,
      public_id: file.originalname.split(".")[0], // Store with original name
      resource_type: "auto", // Automatically detect resource type
    };
  },
});

// Set up multer with Cloudinary storage for multiple files
const upload = multer({ storage: storage });

const getPublicArtworkForExplore = async (req, res) => {
  try {
    // Destructure and parse query parameters with defaults
    let {
      page = "1",
      limit = "20",
      sort = "recent",
      topic,
      tags,
      search,
    } = req.query;

    console.log("Query params:", req.query);

    // Convert page and limit to integers and ensure they are positive
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 20;

    const query = {};

    // Handle topic filter: treat 'topic' as array of ObjectId strings
    if (topic) {
      // Ensure topic is an array. If it's a string, split by comma
      let topicArray = [];
      if (Array.isArray(topic)) {
        topicArray = topic;
      } else if (typeof topic === "string") {
        topicArray = topic.split(",").map((t) => t.trim());
      }

      console.log("topicArray:", topicArray);

      query.topic = { $in: topicArray };
    }

    // Handle tags filter
    if (tags) {
      // Ensure tags is an array. If it's a string, split by comma
      let tagsArray = [];
      if (Array.isArray(tags)) {
        tagsArray = tags;
      } else if (typeof tags === "string") {
        tagsArray = tags.split(",").map((tag) => tag.trim());
      }

      // Filter out any empty strings
      tagsArray = tagsArray.filter((tag) => tag);

      if (tagsArray.length > 0) {
        query.tags = { $in: tagsArray };
      }
    }

    // Handle search filter
    if (search) {
      // Use $regex for partial matching and case-insensitive search
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    // Determine sort options
    let sortOption = { createdAt: -1 }; // Default: recent

    switch (sort) {
      case "popular":
        sortOption = { likesCount: -1 };
        break;
      case "trending":
        sortOption = { viewsCount: -1, createdAt: -1 };
        break;
      case "staff-picks":
        query.isStaffPick = true;
        sortOption = { createdAt: -1 };
        break;
      case "random":
        // Random sort will be handled separately
        break;
      case "recent":
      default:
        sortOption = { createdAt: -1 };
    }

    // Count total artworks matching the query
    const totalArtworks = await Artwork.countDocuments(query);

    let artworks;

    if (sort === "random") {
      // Use aggregation with $sample for random sorting
      artworks = await Artwork.aggregate([
        { $match: query },
        { $sample: { size: limit } },
        // Lookup artist details
        {
          $lookup: {
            from: "artists", // Ensure this matches the actual collection name
            localField: "artist",
            foreignField: "_id",
            as: "artist",
          },
        },
        { $unwind: "$artist" },
        // Lookup topic details
        {
          $lookup: {
            from: "topics", // Ensure this matches the actual collection name
            localField: "topic",
            foreignField: "_id",
            as: "topic",
          },
        },
        // Optionally, limit fields returned
        {
          $project: {
            title: 1,
            description: 1,
            files: 1,
            artist: { name: 1, profilePicture: 1 },
            topic: { name: 1 },
            likesCount: 1,
            viewsCount: 1,
            createdAt: 1,
            isStaffPick: 1,
          },
        },
      ]);
    } else {
      // For other sorting options, use find with sort, skip, limit, and populate
      artworks = await Artwork.find(query)
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("artist", "name profilePicture") // Populate artist's name and profile picture
        .lean();
    }

    // Calculate total pages
    const totalPages = Math.ceil(totalArtworks / limit);

    // Respond with artworks and pagination info
    res.status(200).json({
      artworks,
      currentPage: page,
      totalPages,
      totalArtworks,
    });
  } catch (error) {
    console.error("Error in getPublicArtworkForExplore:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

const getUserRecommentExplore = async (req, res) => {
  const userId = req.user.id;
 
  try {
    const {
      page = 1,
      limit = 20,
      sort = "recent",
      tags,
      search,
      topic,
    } = req.query;

    // Fetch user's interested topics
    const user = await User.findById(userId);

    let userInterestedTopics = [];
    userInterestedTopics = user.interestedTopics.map((topic) => topic._id);

    const query = {};

    if (userId) {
      query.userId = userId;
    }

    if (userInterestedTopics) {
      query.topic = userInterestedTopics;
    }

    if (tags) {
      query.tags = { $in: tags.split(",") };
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Set sorting options
    let sortOption = {};
    switch (sort) {
      case "popular":
        sortOption = { likesCount: -1 };
        break;
      case "trending":
        sortOption = { viewsCount: -1, createdAt: -1 };
        break;
      case "staff-picks":
        query.isStaffPick = true;
        sortOption = { createdAt: -1 };
        break;
      case "random":
        // Handle random sorting
        break;
      case "recent":
      default:
        sortOption = { createdAt: -1 };
    }

    // Retrieve artworks based on query and sort option
    let artworks;
    const totalArtworks = await Artwork.countDocuments(query);

    if (sort === "random") {
      artworks = await Artwork.aggregate([
        { $match: query },
        { $sample: { size: parseInt(limit) } },
      ]);
    } else {
      artworks = await Artwork.find(query)
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .populate("artist", "name profilePicture")
        // .populate("topic", "name")
        .lean();
    }

    // Enhance artwork data with additional information
    artworks = await Promise.all(
      artworks.map(async (artwork) => {
        const enhancedArtwork = {
          ...artwork,
          filePreview: artwork.files[0]?.fileUrl,
          fileCount: artwork.files.length,
          topicName: artwork.topic?.name,
        };

        // Check if the logged-in user has liked this artwork
        const userLike = await UserActivity.findOne({
          userId,
          artworkId: artwork._id,
          activityType: "like",
        });
        enhancedArtwork.isLiked = !!userLike;

        // Check if the logged-in user follows the artist
        const userFollow = await UserActivity.findOne({
          userId,
          followedUserId: artwork.artist._id,
          activityType: "follow",
        });
        enhancedArtwork.isArtistFollowed = !!userFollow;

        return enhancedArtwork;
      })
    );

    // Personalized recommendation logic
    let recommendations = [];
    if (userId) {
      // Get user interests from their activity
      const userInterests = await UserActivity.aggregate([
        { $match: { userId: userId } },
        { $group: { _id: "$artworkId", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]);

      const interestIds = userInterests.map((interest) => interest._id);

      recommendations = await Artwork.find({
        topic: { $in: userInterestedTopics }, // Find artworks matching user's interested topics
        _id: { $nin: interestIds }, // Exclude already interacted artworks
      })
        .limit(10)
        .populate("artist", "name profilePicture")
        .lean();

      console.log("Topic-based recommendations:", recommendations);

      if (!recommendations.length) {
        recommendations = await Artwork.find({
          _id: { $nin: interestIds },
          $or: [
            {
              topic: {
                $in: await Artwork.distinct("topic", {
                  _id: { $in: interestIds },
                }),
              },
            },
            {
              tags: {
                $in: await Artwork.distinct("tags", {
                  _id: { $in: interestIds },
                }),
              },
            },
          ],
        })
          .limit(10)
          .populate("artist", "name profilePicture")
          .lean();
      }
    }

    // Return paginated artworks and recommendations
    res.status(200).json({
      artworks,
      recommendations,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalArtworks / limit),
      totalArtworks,
    });
  } catch (error) {
    console.error("Error in getUserRecommentExplore:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

//getArtworks of own user
const getArtworks = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    // Fetch artworks with pagination, filtering, and sorting
    const artworks = await Artwork.find({ artist: userId })
      .populate("artist", "name") // Populate artist's name
      .limit(Number(limit))
      .skip(Number(skip))
      .sort({ createdAt: -1 });

    // Count the total number of artworks matching the hehe
    const totalArtworks = await Artwork.countDocuments({ artist: userId });

    // Return the artworks along with pagination info
    res.status(200).json({
      artworks,
      totalArtworks,
      totalPages: Math.ceil(totalArtworks / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// Add Artwork function
const addArtwork = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { title, description, artistId, tags, fileDescriptions, topic } =
      req.body;

    // Validate required fields
    if (!title || !req.files || !artistId) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ error: "Title, files, and artist are required." });
    }

    // Validate artistId
    if (!mongoose.Types.ObjectId.isValid(artistId)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: "Invalid artist ID." });
    }

    // Handle Topics: Convert topic names to ObjectIds
    let topicIds = [];
    if (topic) {
      const topicNames = Array.isArray(topic)
        ? topic
        : topic.split(",").map((t) => t.trim());

      // Find existing topics
      const existingTopics = await Topic.find({
        name: { $in: topicNames },
      }).session(session);
      const existingTopicNames = existingTopics.map((t) => t.name);
      const existingTopicIds = existingTopics.map((t) => t._id);

      // Determine which topics need to be created
      const newTopicNames = topicNames.filter(
        (t) => !existingTopicNames.includes(t)
      );

      // Create new topics
      let newTopics = [];
      if (newTopicNames.length > 0) {
        newTopics = await Topic.insertMany(
          newTopicNames.map((name) => ({ name, artworkCount: 1 })),
          { session }
        );
      }

      // Combine existing and new topic IDs
      topicIds = [...existingTopicIds, ...newTopics.map((t) => t._id)];

      // Update artworkCount for existing topics
      if (existingTopicIds.length > 0) {
        await Topic.updateMany(
          { _id: { $in: existingTopicIds } },
          { $inc: { artworkCount: 1 } },
          { session }
        );
      }
    }

    // Handle Tags: Convert to array and sanitize
    const tagsArray = tags
      ? Array.isArray(tags)
        ? tags
        : tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
      : [];

    // Prepare Tag bulk operations
    const tagUpdateOperations = tagsArray.map((tag) => ({
      updateOne: {
        filter: { name: tag },
        update: { $inc: { artworkCount: 1 } },
        upsert: true,
      },
    }));

    if (tagUpdateOperations.length > 0) {
      await Tag.bulkWrite(tagUpdateOperations, { session });
    }

    // Handle File Uploads and Thumbnail Generation
    let thumbnailUrl = null;
    const fileUploads = await Promise.all(
      req.files.map(async (file, index) => {
        // Upload file to Cloudinary
        let uploadOptions = {
          folder: "artworks", // Adjust folder as needed
          resource_type: file.mimetype.startsWith("video/") ? "video" : "image",
        };

        const uploadedFile = await cloudinary.uploader.upload(
          file.path,
          uploadOptions
        );

        // Generate thumbnail for the first file
        if (index === 0) {
          if (uploadedFile.resource_type === "image") {
            thumbnailUrl = cloudinary.url(uploadedFile.public_id, {
              transformation: [
                // { width: 400, crop: "scale" }, // Uncomment if resizing is needed
                { effect: "sharpen" },
              ],
              resource_type: "image",
            });
          } else if (uploadedFile.resource_type === "video") {
            thumbnailUrl = cloudinary.url(uploadedFile.public_id, {
              resource_type: "video",
              format: "jpg",
              start_offset: "10", // Capture frame at the 10th second
              transformation: [
                // { width: 400, crop: "scale" }, // Uncomment if resizing is needed
                { effect: "sharpen" },
              ],
            });
          }
        }

        return {
          fileUrl: uploadedFile.secure_url, // Use secure_url from Cloudinary
          fileType: uploadedFile.resource_type === "video" ? "video" : "image",
          description:
            fileDescriptions && fileDescriptions[index]
              ? fileDescriptions[index]
              : "",
        };
      })
    );

    // Create Artwork Document
    const newArtwork = new Artwork({
      title,
      description,
      files: fileUploads,
      artist: artistId,
      topic: topicIds, // Assign ObjectIds
      tags: tagsArray,
      thumbnail: thumbnailUrl,
    });

    await newArtwork.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(newArtwork);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error in addArtwork:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
}; //Update Artwork function

const updateArtwork = async (req, res) => {
  try {
    const { artistId, artworkId } = req.params; // Destructure artistId and artworkId from URL parameters
    const { title, description, domain, tags } = req.body; // Destructure updated fields from request body

    // Find the artwork by ID
    const artwork = await Artwork.findById(artworkId);

    // Check if artwork exists
    if (!artwork) {
      return res.status(404).json({ error: "Artwork not found" });
    }

    // Check if the artist is authorized to update this artwork
    if (artwork.artist.toString() !== artistId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to update this artwork" });
    }

    // Update the artwork fields
    const updatedArtwork = await Artwork.findByIdAndUpdate(
      artworkId,
      { title, description, domain, tags },
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    res.status(200).json(updatedArtwork);
  } catch (error) {
    console.error("Error updating artwork:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

//Delete Artwork function
const deleteArtwork = async (req, res) => {
  try {
    const { artistId, artworkId } = req.params; // Get artistId and artworkId from request parameters

    // Find the artwork by ID
    const artwork = await Artwork.findById(artworkId);

    // Check if artwork exists
    if (!artwork) {
      return res.status(404).json({ error: "Artwork not found" });
    }

    // Check if the artist is authorized to delete this artwork
    if (artwork.artist.toString() !== artistId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this artwork" });
    }

    // Remove the artwork
    await Artwork.findByIdAndDelete(artworkId);

    // Decrement the artwork count for each tag associated with the artwork
    if (artwork.tags && artwork.tags.length > 0) {
      await Promise.all(
        artwork.tags.map((tag) =>
          Tag.updateOne({ name: tag }, { $inc: { artworkCount: -1 } })
        )
      );
    }

    res.status(200).json({ message: "Artwork deleted successfully" });
  } catch (error) {
    console.error("Error deleting artwork:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get Artwork by id function
const getArtworkById = async (req, res) => {
  try {
    const artworkId = req.params.artworkId;
    const artwork = await Artwork.findById(artworkId).populate(
      "artist",
      "name"
    );
    if (!artwork) {
      return res.status(404).json({ error: "Artwork not found" });
    }
    return res.status(200).json(artwork);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  addArtwork,
  updateArtwork,
  deleteArtwork,
  getArtworkById,
  getArtworks,
  upload,
  getPublicArtworkForExplore,
  getUserRecommentExplore,
};
