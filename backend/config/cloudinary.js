const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
// Set up multer with Cloudinary storage for multiple files
const multer = require("multer");

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = "artworks"; // Default folder

    if (file.mimetype.startsWith("image/")) {
      folder = "images";
    } else if (file.mimetype.startsWith("video/")) {
      folder = "video";
    } else if (
      file.mimetype === "text/plain" ||
      file.mimetype === "application/pdf"
    ) {
      folder = "resumes";
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

module.exports = { storage, upload };
