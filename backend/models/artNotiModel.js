const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who receives the notification
        required: true,
    },
    type: {
        type: String,
        enum: ['follow', 'new_artwork', 'comment'], // Possible types of notifications
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false, // Default is unread notification
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
