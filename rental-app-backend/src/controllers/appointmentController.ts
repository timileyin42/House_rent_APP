import { Request, Response } from 'express';
import Appointment from '../models/Appointment';
import { createEvent } from '../utils/googleCalendar';

export const scheduleAppointment = async (req: Request, res: Response): Promise<void> => {
  const { tenantId, landlordId, propertyId, dateTime, notes, tenantEmail, landlordEmail } = req.body;

  try {
    if (!tenantId || !landlordId || !propertyId || !dateTime || !tenantEmail || !landlordEmail) {
      res.status(400).json({ message: 'Missing required fields.' });
      return;
    }

    const appointment = new Appointment({
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
      const event = await createEvent(eventDetails);
      appointment.calendarEventId = event.id || '';
    } catch (error) {
      console.error('Google Calendar Event Error:', error);
      res.status(500).json({ message: 'Failed to create Google Calendar event.', error });
      return;
    }

    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error scheduling appointment:', error);
    res.status(500).json({ message: 'Error scheduling appointment.', error: error instanceof Error ? error.message : error });
  }
};

export const getAppointmentsForProperty = async (req: Request, res: Response): Promise<void> => {
  const { propertyId } = req.params;

  try {
    if (!propertyId) {
      res.status(400).json({ message: 'Property ID is required.' });
      return;
    }

    const appointments = await Appointment.find({ propertyId }).populate('tenantId landlordId');
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Error fetching appointments.', error: error instanceof Error ? error.message : error });
  }
};


