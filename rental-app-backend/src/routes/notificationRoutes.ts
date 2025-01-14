import { Router } from 'express';
import { getUserNotifications, markNotificationsAsRead } from '../controllers/notificationController';

const router = Router();

router.get('/:userId', getUserNotifications);
router.put('/markRead', markNotificationsAsRead);

export default router;

