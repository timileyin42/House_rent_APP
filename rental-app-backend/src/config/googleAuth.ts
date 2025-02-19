import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Path to credentials.json
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');

// Load credentials
const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
const { client_id, client_secret, redirect_uris } = credentials.installed || credentials.web;

// Set up OAuth2 client
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

export { oAuth2Client, google };
