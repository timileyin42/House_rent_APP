"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointmentsForProperty = exports.scheduleAppointment = void 0;
const Appointment_1 = __importDefault(require("../models/Appointment"));
const googleCalendar_1 = require("../utils/googleCalendar");
const scheduleAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenantId, landlordId, propertyId, dateTime, notes, tenantEmail, landlordEmail } = req.body;
    try {
        if (!tenantId || !landlordId || !propertyId || !dateTime || !tenantEmail || !landlordEmail) {
            res.status(400).json({ message: 'Missing required fields.' });
            return;
        }
        const appointment = new Appointment_1.default({
            tenantId,
            landlordId,
            propertyId,
            dateTime,
            notes,
        });
        try {
            const eventDetails = {
                summary: `Property Viewing Appointment`,
                description: `Viewing for property ID: ${propertyId}`,
                start: { dateTime: new Date(dateTime).toISOString() },
                end: { dateTime: new Date(new Date(dateTime).getTime() + 30 * 60 * 1000).toISOString() }, // 30 min duration
                attendees: [
                    { email: tenantEmail },
                    { email: landlordEmail },
                ],
            };
            const event = yield (0, googleCalendar_1.createEvent)(eventDetails);
            appointment.calendarEventId = event.id || '';
        }
        catch (error) {
            console.error('Google Calendar Event Error:', error);
            res.status(500).json({ message: 'Failed to create Google Calendar event.', error });
            return;
        }
        yield appointment.save();
        res.status(201).json(appointment);
    }
    catch (error) {
        console.error('Error scheduling appointment:', error);
        res.status(500).json({ message: 'Error scheduling appointment.', error: error instanceof Error ? error.message : error });
    }
});
exports.scheduleAppointment = scheduleAppointment;
const getAppointmentsForProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { propertyId } = req.params;
    try {
        if (!propertyId) {
            res.status(400).json({ message: 'Property ID is required.' });
            return;
        }
        const appointments = yield Appointment_1.default.find({ propertyId }).populate('tenantId landlordId');
        res.status(200).json(appointments);
    }
    catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Error fetching appointments.', error: error instanceof Error ? error.message : error });
    }
});
exports.getAppointmentsForProperty = getAppointmentsForProperty;
