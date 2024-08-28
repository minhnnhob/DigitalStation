const Artwork = require("../models/artWorkModel");
const Tag = require("../models/tagsModel");
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

// Add Artwork function
const addArtwork = async(req, res) =>{
  try {
    const { title, description, artistId, domain, tags } = req.body;

    // Ensure the required fields are provided
    if (!title || !req.files || !artistId || !domain) {
      return res
        .status(400)
        .json({ error: "Title, files, artist, and domain are required." });
    }

    const fileUploads = [];

    // Handle multiple file uploads
    await req.files.forEach((file) => {
      const fileUrl = file.path;
      const fileType = file.mimetype; // Store MIME type for reference

      // Collect all file information to be saved in one go
      fileUploads.push({ fileUrl, fileType });
    });

    // Create the new artwork with multiple files
    const artwork = await Artwork.create({
      title,
      description,
      files: fileUploads,
      artist: artistId,
      domain,
      tags,
    });

    // Optionally, update tags in a separate collection
    if (tags && tags.length > 0) {
      for (const tag of tags) {
        await Tag.updateOne(
          { name: tag },
          { $inc: { artworkCount: 1 } },
          { upsert: true } // Create the tag if it doesn't exist
        );
      }
    }

    res.status(201).json(artwork);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({ error: "Server Error" });
  }
}


module.exports = {
  addArtwork,
  upload,
};
