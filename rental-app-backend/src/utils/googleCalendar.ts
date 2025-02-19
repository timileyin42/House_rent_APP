import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const CREDENTIALS_PATH = path.join(__dirname, '../config/credentials.json');

const auth = new google.auth.GoogleAuth({
  keyFile: CREDENTIALS_PATH,
  scopes: SCOPES,
});

const calendar = google.calendar({ version: 'v3', auth });

export const createEvent = async (eventDetails: any) => {
  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: eventDetails.summary,
        description: eventDetails.description,
        start: { dateTime: eventDetails.start.dateTime, timeZone: 'UTC' },
        end: { dateTime: eventDetails.end.dateTime, timeZone: 'UTC' },
        attendees: eventDetails.attendees,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating Google Calendar event:', error);
    throw error;
  }
};

