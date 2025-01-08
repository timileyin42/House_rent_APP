import { Request, Response } from 'express';
import Notification from '../models/Notification';

// Fetch user notifications
export const getUserNotifications = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching notifications',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

// Mark notifications as read
export const markNotificationsAsRead = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.body;

        if (!userId) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }

        await Notification.updateMany({ userId, isRead: false }, { isRead: true });
        res.status(200).json({ message: 'Notifications marked as read' });
    } catch (error) {
        res.status(500).json({
            message: 'Error marking notifications as read',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

