"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.google = exports.oAuth2Client = void 0;
const googleapis_1 = require("googleapis");
Object.defineProperty(exports, "google", { enumerable: true, get: function () { return googleapis_1.google; } });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Path to credentials.json
const CREDENTIALS_PATH = path_1.default.join(__dirname, 'credentials.json');
// Load credentials
const credentials = JSON.parse(fs_1.default.readFileSync(CREDENTIALS_PATH, 'utf8'));
const { client_id, client_secret, redirect_uris } = credentials.installed || credentials.web;
// Set up OAuth2 client
const oAuth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
exports.oAuth2Client = oAuth2Client;
