import express from 'express';
import {
    createMaintenanceRequest,
    getMaintenanceRequests,
} from '../controllers/maintenanceController';
import protect from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, createMaintenanceRequest);
router.get('/:tenantId', protect, getMaintenanceRequests);

export default router;

