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
const { upload } = require("../config/cloudinary");
const { requireAuth } = require("../middleware/requireAuth");

// Route to add new artwork with multiple file uploads
// Route to get all artwork
router.get("/", getPublicArtworkForExplore);


router.get("/:userId", getArtworks);

// Route to get artwork by ID

router.get("/artwork/:artworkId", getArtworkById);

router.post("/", upload.array("files", 10), addArtwork); // Allows up to 10 files to be uploaded




router.use(requireAuth);
router.post("/explore",getUserRecommentExplore ); 

// Route to delete artwork
router.delete("/:artworkId", deleteArtwork);

// Route to update artwork
router.patch("/:artworkId",upload.array("files", 10), updateArtwork);

module.exports = router;
