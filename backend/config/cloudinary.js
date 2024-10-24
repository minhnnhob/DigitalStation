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
      folder = "artworks/images";
    } else if (file.mimetype.startsWith("video/")) {
      folder = "artworks/video";
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

const storageUser = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = "user"; // Default folder for user uploads

    // Determine which folder to store the file in based on file field
    if (file.fieldname === "profilePicture") {
      folder = "user/profilePictures";
    } else if (file.fieldname === "coverPicture") {
      folder = "user/coverPictures";
    }else if (
      file.mimetype === "text/plain" ||
      file.mimetype === "application/pdf"
    ) {
      folder = "resumes";
    }

    return {
      folder: folder,
      public_id: file.originalname.split(".")[0], // Store with the original file name (excluding extension)
      resource_type: "auto", // Automatically detect resource type (image, video, etc.)
    };
  },
});

const storageStudio = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = "studio"; // Default folder for studio uploads

    // Determine which folder to store the file in based on file field
    if (file.fieldname === "studioProfileImage") {
      folder = "studio/ProfilePictures";
    } else if (file.fieldname === "backgroundImage") {
      folder = "studio/coverPictures";
    }

    return {
      folder: folder,
      public_id: file.originalname.split(".")[0], // Store with the original file name (excluding extension)
      resource_type: "auto", // Automatically detect resource type (image, video, etc.)
    };
  },
});

// Set up multer with Cloudinary storage for multiple files
const upload = multer({ storage: storage });
const uploadUser = multer({ storage: storageUser }).fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "coverPicture", maxCount: 1 },
  {name: "resume", maxCount: 1},
]);

const uploadStudio = multer({ storage: storageStudio }).fields([
  { name: "studioProfileImage", maxCount: 1 },
  { name: "backgroundImage", maxCount: 1 },
]);

module.exports = { storage, upload, uploadUser, uploadStudio };
