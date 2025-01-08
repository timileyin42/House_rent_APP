import { Router } from 'express';
import { approveProperty, rejectProperty, getPendingProperties, getPropertyStatistics, getUserActivities } from '../controllers/adminController';

const router = Router();

// Get all pending properties
router.get('/properties/pending', getPendingProperties);

// Approve a property
router.post('/properties/:id/approve', approveProperty);

// Reject a property
router.post('/properties/:id/reject', rejectProperty);

// Get property statistics (views and inquiries)
router.get('/properties/statistics', getPropertyStatistics);

// Get user activities
router.get('/users/activities', getUserActivities); // New route for user activities

export default router;
