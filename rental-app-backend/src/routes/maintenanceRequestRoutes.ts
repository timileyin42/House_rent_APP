import express from 'express';
import {
  createMaintenanceRequest,
  getMaintenanceRequests,
  updateMaintenanceRequestStatus,
  deleteMaintenanceRequest,
} from '../controllers/maintenanceRequestController';
import protect from '../middleware/authMiddleware';

const router = express.Router();

// Create a maintenance request
router.post('/', protect, createMaintenanceRequest);

// Get maintenance requests (tenant or landlord based on role)
router.get('/', protect, getMaintenanceRequests);

// Update the status of a maintenance request
router.patch('/status', protect, updateMaintenanceRequestStatus);

// Delete a maintenance request
router.delete('/:requestId', protect, deleteMaintenanceRequest);

export default router;

