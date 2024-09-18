const Artwork = require("../models/artWorkModel");
const Tag = require("../models/tagsModel");
const UserActivity = require("../models/userActivityModel");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = "artworks"; // Default folder

    if (file.mimetype.startsWith("image/")) {
      folder = "images";
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
    const {
      page = 1,
      limit = 20,
      sort = "recent",
      topicId,
      tags,
      search,
      userId,
    } = req.query;

    const query = {};

    // Apply topic filter if provided
    if (topicId) query.topicId = topic;

    // Apply tag filter if provided
    if (tags) query.tags = { $in: tags.split(",") };

    // Apply search filter if provided
    if (search) query.$text = { $search: search };

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
        // Random sort handling
        break;
      case "recent":
      default:
        sortOption = { createdAt: -1 };
    }

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
        .populate("topicId", "name")
        .lean();
    }

    res.status(200).json({
      artworks,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalArtworks / limit),
      totalArtworks,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

const getUserRecommentExplore = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      sort = "recent",
      topic,
      tags,
      search,
      userId,
    } = req.query;

    const query = {};

    
    if (userId) {
      query.userId = userId;
    }
    
    if (tags) {
      query.tags = { $in: tags.split(",") };
    }

 
    if (search) {
      query.$text = { $search: search };
    }

   
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
        // Handle random sort differently
        break;
      case "recent":
      default:
        sortOption = { createdAt: -1 };
    }

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
        .populate("topicId", "name")
        .lean();
    }

    // Enhance artwork data
    artworks = await Promise.all(
      artworks.map(async (artwork) => {
        const enhancedArtwork = {
          ...artwork,
          filePreview: artwork.files[0]?.fileUrl,
          fileCount: artwork.files.length,
          topicName: artwork.topicId?.name,
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

    // Get personalized recommendations for logged-in users
    let recommendations = [];

    const userInterests = await UserActivity.aggregate([
      { $match: { userId: userId } },
      { $group: { _id: "$artworkId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    const interestIds = userInterests.map((interest) => interest._id);

    recommendations = await Artwork.find({
      _id: { $nin: interestIds },
      $or: [
        {
          topicId: {
            $in: await Artwork.distinct("topicId", {
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

    res.status(200).json({
      artworks,
      recommendations,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalArtworks / limit),
      totalArtworks,
     
    });
    
  } catch (error) {
    console.error("Error in getArtworksForExplore:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

const getArtworks = async (req, res) => {
  try {
    const { topicId, artistId, page = 1, limit = 10 } = req.query;

    // Create a query object based on the optional filters
    const query = {};
    if (topicId) {
      query.topicId = topicId;
    }
    if (artistId) {
      query.artist = artistId;
    }

    // Calculate pagination parameters
    const skip = (page - 1) * limit;

    // Fetch artworks with pagination, filtering, and sorting
    const artworks = await Artwork.find(query)
      .populate("artist", "name") // Populate artist's name
      .limit(Number(limit))
      .skip(Number(skip))
      .sort({ createdAt: -1 });

    // Count the total number of artworks matching the query
    const totalArtworks = await Artwork.countDocuments(query);

    // Return the artworks along with pagination info
    res.status(200).json({
      artworks,
      totalPages: Math.ceil(totalArtworks / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// Add Artwork function
// Optimized addArtwork function
const addArtwork = async (req, res) => {
  try {
    // const { title, description, artistId, topicId, tags } = req.body;
    const { title, description, artistId, tags } = req.body;

    // Ensure the required fields are provided
    if (!title || !req.files || !artistId) {
      //(!title || !req.files || !artistId || !topicId)
      return res
        .status(400)
        .json({ error: "Title, files, artist, and domain are required." });
    }

    // Prepare file upload information in a non-blocking manner
    const fileUploads = req.files.map((file) => ({
      fileUrl: file.path,
      fileType: file.mimetype,
    }));

    // Convert tags to an array if it is not already one
    const tagsArray = Array.isArray(tags)
      ? tags
      : tags
      ? tags.split(",").map((tag) => tag.trim())
      : [];

    // Execute artwork creation and tag updates concurrently
    const artworkCreationPromise = Artwork.create({
      title,
      description,
      files: fileUploads,
      artist: artistId,
      // topicId:topicId,
      tags: tagsArray,
    });

    // Use a bulk operation to update tags in the database
    const tagUpdatePromises = tagsArray.map((tag) => ({
      updateOne: {
        filter: { name: tag },
        update: { $inc: { artworkCount: 1 } },
        upsert: true,
      },
    }));

    const [artwork] = await Promise.all([
      artworkCreationPromise,
      tagUpdatePromises.length > 0
        ? Tag.bulkWrite(tagUpdatePromises)
        : Promise.resolve(),
    ]);

    res.status(201).json(artwork);
  } catch (error) {
    console.error("Error in addArtwork:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};
//Update Artwork function
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
const getArtworkById = async (artworkId) => {
  try {
    const artwork = await Artwork.findById(artworkId)
      .populate("artist", "name")
      .populate("comments.userId", "name");
    if (!artwork) {
      return res.status(404).json({ error: "Artwork not found" });
    }
    return artwork;
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
