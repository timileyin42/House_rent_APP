import express from 'express';
import { scheduleAppointment, getAppointmentsForProperty } from '../controllers/appointmentController';

const router = express.Router();

// Schedule an appointment
router.post('/schedule', scheduleAppointment);

// Get appointments for a specific property
router.get('/:propertyId', getAppointmentsForProperty);

export default router;

