const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const followerSchema = new Schema({
    followerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    followingId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Follower', followerSchema);