"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../controllers/messageController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Endpoints for sending and retrieving messages.
 */
/**
 * @swagger
 * /messages/tenant/{tenantId}:
 *   get:
 *     summary: Get messages for a specific tenant
 *     description: Retrieve messages related to a specific tenant.
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tenantId
 *         required: true
 *         description: The ID of the tenant.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Messages retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   senderId:
 *                     type: string
 *                   recipientId:
 *                     type: string
 *                   message:
 *                     type: string
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized access.
 *       404:
 *         description: No messages found.
 */
router.get('/tenant/:tenantId', authMiddleware_1.default, messageController_1.getTenantMessages);
/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Send a message
 *     description: Allows users to send a message.
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderId:
 *                 type: string
 *                 description: The ID of the sender.
 *               recipientId:
 *                 type: string
 *                 description: The ID of the recipient.
 *               message:
 *                 type: string
 *                 description: The message content.
 *     responses:
 *       201:
 *         description: Message sent successfully.
 *       400:
 *         description: Invalid request data.
 */
router.post('/', messageController_1.sendMessage);
/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Get all messages
 *     description: Retrieves all messages from the database.
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: Messages retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   senderId:
 *                     type: string
 *                   recipientId:
 *                     type: string
 *                   message:
 *                     type: string
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 */
router.get('/', messageController_1.getMessages);
exports.default = router;
