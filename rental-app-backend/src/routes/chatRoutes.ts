// src/routes/chatRoutes.ts
import { Router } from 'express';
import { getChatHistory, sendMessage } from '../controllers/chatController';

const router = Router();

router.get('/:chatId', getChatHistory);
router.post('/:chatId/sendMessage', sendMessage);

export default router;

