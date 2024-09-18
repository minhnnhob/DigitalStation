const express = require('express');
const { likeArtwork, unlikeArtwork, getLikesByArtwork } = require('../controllers/likeController');
const router = express.Router();

router.post("/like", likeArtwork);

// Unlike an artwork
router.post("/unlike", unlikeArtwork);

// Get all likes for a specific artwork
router.get("/artwork/:artworkId", getLikesByArtwork);

module.exports = router;