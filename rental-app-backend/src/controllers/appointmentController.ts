import { Request, Response } from 'express';
import Appointment from '../models/Appointment';
import { createEvent } from '../utils/googleCalendar';

export const scheduleAppointment = async (req: Request, res: Response): Promise<void> => {
  const { tenantId, landlordId, propertyId, dateTime, notes } = req.body;

  try {
    // Save the appointment in the database
    const appointment = await Appointment.create({
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

    const event = await createEvent(eventDetails);
    
    // Ensure event.id is a string
    if (event.id) {
      appointment.calendarEventId = event.id;
    } else {
      appointment.calendarEventId = ''; // Handle the case where event.id is null or undefined
    }

    await appointment.save();

    res.status(201).json(appointment);
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error scheduling appointment.', error: error.message });
    } else {
      res.status(500).json({ message: 'Error scheduling appointment.', error: 'An unknown error occurred.' });
    }
  }
};

export const getAppointmentsForProperty = async (req: Request, res: Response): Promise<void> => {
  const { propertyId } = req.params;

  try {
    const appointments = await Appointment.find({ propertyId }).populate('tenantId landlordId');
    res.status(200
