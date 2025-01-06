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
    const { tenantId, landlordId, propertyId, dateTime, notes } = req.body;
    try {
        // Save the appointment in the database
        const appointment = yield Appointment_1.default.create({
            tenantId,
            landlordId,
            propertyId,
            dateTime,
            notes,
        });
        // Create Google Calendar event
        const eventDetails = {
            summary: `Property Viewing Appointment`,
            description: `Viewing for property ID: ${propertyId}`,
            start: { dateTime: new Date(dateTime).toISOString() },
            end: { dateTime: new Date(new Date(dateTime).getTime() + 30 * 60 * 1000).toISOString() }, // 30 mins duration
            attendees: [
                { email: req.body.tenantEmail }, // Assuming tenant email is passed in body
                { email: req.body.landlordEmail }, // Assuming landlord email is passed in body
            ],
        };
        const event = yield (0, googleCalendar_1.createEvent)(eventDetails);
        // Ensure event.id is a string
        if (event.id) {
            appointment.calendarEventId = event.id;
        }
        else {
            appointment.calendarEventId = ''; // Handle the case where event.id is null or undefined
        }
        yield appointment.save();
        res.status(201).json(appointment);
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error scheduling appointment.', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Error scheduling appointment.', error: 'An unknown error occurred.' });
        }
    }
});
exports.scheduleAppointment = scheduleAppointment;
const getAppointmentsForProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { propertyId } = req.params;
    try {
        const appointments = yield Appointment_1.default.find({ propertyId }).populate('tenantId landlordId');
        res.status(200).json(appointments);
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error fetching appointments.', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Error fetching appointments.', error: 'An unknown error occurred.' });
        }
    }
});
exports.getAppointmentsForProperty = getAppointmentsForProperty;
