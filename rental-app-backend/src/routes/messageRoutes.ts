import express from 'express';
import { sendMessage, getMessages, getTenantMessages } from '../controllers/messageController';
import protect from '../middleware/authMiddleware';

const router = express.Router();

router.get('/tenant/:tenantId', protect, getTenantMessages);
router.post('/', sendMessage);
router.get('/', getMessages);

export default router;

