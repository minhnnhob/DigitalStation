const express = require("express");
const router = express.Router();
const { addArtwork } = require("../controllers/artWorkController");
const { upload } = require("../controllers/artWorkController");

// Route to add new artwork with multiple file uploads
router.post("/", upload.array("files", 10), addArtwork); // Allows up to 10 files to be uploaded

module.exports = router;
