import { Router } from 'express';
import { getUserNotifications, markNotificationsAsRead } from '../controllers/notificationController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Endpoints for managing user notifications.
 */

/**
 * @swagger
 * /notifications/{userId}:
 *   get:
 *     summary: Get notifications for a user
 *     description: Retrieve all notifications for a specific user.
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   message:
 *                     type: string
 *                   read:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: No notifications found.
 */
router.get('/:userId', getUserNotifications);

/**
 * @swagger
 * /notifications/markRead:
 *   put:
 *     summary: Mark notifications as read
 *     description: Marks all unread notifications as read for the user.
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user.
 *     responses:
 *       200:
 *         description: Notifications marked as read successfully.
 *       400:
 *         description: Invalid request data.
 */
router.put('/markRead', markNotificationsAsRead);

export default router;

