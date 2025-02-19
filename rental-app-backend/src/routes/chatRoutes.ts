// src/routes/chatRoutes.ts
import { Router } from 'express';
import { getChatHistory, sendMessage } from '../controllers/chatController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat messaging system
 */

/**
 * @swagger
 * /api/chat/{chatId}:
 *   get:
 *     summary: Get chat history
 *     description: Retrieve the chat history of a specific conversation.
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the chat session.
 *     responses:
 *       200:
 *         description: Successfully retrieved chat history.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sender:
 *                     type: string
 *                     description: Sender of the message.
 *                   message:
 *                     type: string
 *                     description: Message content.
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     description: Time when the message was sent.
 *       404:
 *         description: Chat history not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:chatId', getChatHistory);

/**
 * @swagger
 * /api/chat/{chatId}/sendMessage:
 *   post:
 *     summary: Send a message
 *     description: Send a message in a chat session.
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the chat session.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sender:
 *                 type: string
 *                 description: The sender of the message.
 *               message:
 *                 type: string
 *                 description: The content of the message.
 *     responses:
 *       201:
 *         description: Message sent successfully.
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Internal server error.
 */
router.post('/:chatId/sendMessage', sendMessage);

export default router;

