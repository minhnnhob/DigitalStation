const Notification = require('../models/artNotiModel');

// Create a new notification
const createNotification = async (req, res) => {
    try {
        const { userId, type, message } = req.body;

        const newNotification = new Notification({
            userId,
            type,
            message,
        });

        await newNotification.save();

        res.status(201).json({ message: 'Notification created', notification: newNotification });
    } catch (error) {
        console.error("Error in creating notification:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all notifications for a user
const getNotificationsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({ notifications });
    } catch (error) {
        console.error("Error in fetching notifications:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.body;

        const notification = await Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.status(200).json({ message: 'Notification marked as read', notification });
    } catch (error) {
        console.error("Error in marking notification as read:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a notification
const deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;

        const notification = await Notification.findByIdAndDelete(notificationId);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.status(200).json({ message: 'Notification deleted' });
    } catch (error) {
        console.error("Error in deleting notification:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    createNotification,
    getNotificationsByUser,
    markAsRead,
    deleteNotification,
};
