const express = require('express');
const {
    createNotification,
    getNotificationsByUser,
    markAsRead,
    deleteNotification
} = require('../controllers/artNotificationController');

const router = express.Router();

// Create a new notification
router.post('/', createNotification);

// Get all notifications for a specific user
router.get('/:userId', getNotificationsByUser);

// Mark a notification as read
router.patch('/read', markAsRead);

// Delete a notification
router.delete('/:notificationId', deleteNotification);

module.exports = router;
