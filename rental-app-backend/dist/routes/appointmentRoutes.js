"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointmentController_1 = require("../controllers/appointmentController");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Manage property viewing appointments
 */
/**
 * @swagger
 * /api/appointments/schedule:
 *   post:
 *     summary: Schedule an appointment
 *     description: Allows users to schedule a viewing appointment for a property.
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               propertyId:
 *                 type: string
 *                 description: The ID of the property for which the appointment is scheduled.
 *               userId:
 *                 type: string
 *                 description: The ID of the user scheduling the appointment.
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time of the appointment.
 *     responses:
 *       201:
 *         description: Appointment scheduled successfully.
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Internal server error.
 */
router.post('/schedule', appointmentController_1.scheduleAppointment);
/**
 * @swagger
 * /api/appointments/{propertyId}:
 *   get:
 *     summary: Get appointments for a property
 *     description: Retrieves all scheduled appointments for a specific property.
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the property.
 *     responses:
 *       200:
 *         description: List of scheduled appointments.
 *       404:
 *         description: No appointments found for the property.
 *       500:
 *         description: Internal server error.
 */
router.get('/:propertyId', appointmentController_1.getAppointmentsForProperty);
exports.default = router;
