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
exports.createEvent = void 0;
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const CREDENTIALS_PATH = path_1.default.join(__dirname, '../config/credentials.json');
const auth = new googleapis_1.google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: SCOPES,
});
const calendar = googleapis_1.google.calendar({ version: 'v3', auth });
const createEvent = (eventDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield calendar.events.insert({
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
    }
    catch (error) {
        console.error('Error creating Google Calendar event:', error);
        throw error;
    }
});
exports.createEvent = createEvent;
