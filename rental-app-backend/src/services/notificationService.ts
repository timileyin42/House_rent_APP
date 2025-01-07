import Notification from '../models/Notification';

export const createNotification = async (userId: string, type: string, message: string) => {
    try {
        await Notification.create({ userId, type, message });
    } catch (error) {
        console.error('Error creating notification:', error);
    }
};

