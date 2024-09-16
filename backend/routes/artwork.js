const express = require("express");
const router = express.Router();
const {
  addArtwork,
  updateArtwork,
  deleteArtwork,
  getArtworks,
  getArtworkById,
  getPublicArtworkForExplore,
  getUserRecommentExplore
} = require("../controllers/artWorkController");
const { upload } = require("../controllers/artWorkController");

// Route to add new artwork with multiple file uploads
// Route to get all artwork
router.get("/", getPublicArtworkForExplore);

router.get("/explore",getUserRecommentExplore ); 

// Route to get artwork by ID
router.get("/:artworkId", getArtworkById);

router.post("/", upload.array("files", 10), addArtwork); // Allows up to 10 files to be uploaded

// Route to update artwork
router.patch("/:artistId/:artworkId", updateArtwork);
// Route to delete artwork
router.delete("/:artistId/:artworkId", deleteArtwork);

module.exports = router;
