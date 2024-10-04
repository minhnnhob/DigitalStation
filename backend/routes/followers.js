
const express = require('express');

const router = express.Router();
const {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing
} = require('../controllers/followersController');


router.post('/', followUser);
router.delete('/', unfollowUser);
router.get('/followers/:userId', getFollowers);
router.get('/following/:userId', getFollowing);

module.exports = router;
