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
const express_1 = __importDefault(require("express"));
const googleAuth_1 = require("../config/googleAuth");
const router = express_1.default.Router();
/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Redirect to Google OAuth
 *     description: Redirects the user to Google's OAuth 2.0 authentication page.
 *     tags: [Google Auth]
 *     responses:
 *       302:
 *         description: Redirects to Google OAuth page.
 *       500:
 *         description: Failed to generate auth URL.
 */
router.get('/auth/google', (req, res) => {
    try {
        const authUrl = googleAuth_1.oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/calendar'],
        });
        res.redirect(authUrl);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to generate auth URL', error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Handle Google OAuth callback
 *     description: Receives authorization code from Google and exchanges it for access tokens.
 *     tags: [Google Auth]
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         description: Authorization code from Google OAuth.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully authenticated and retrieved tokens.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Google Calendar integration successful!"
 *                 tokens:
 *                   type: object
 *                   description: Access and refresh tokens from Google.
 *       400:
 *         description: Authorization code is missing.
 *       500:
 *         description: Google authentication failed.
 */
router.get('/auth/google/callback', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = req.query.code;
        if (!code) {
            res.status(400).json({ message: 'Authorization code is missing' });
            return;
        }
        const { tokens } = yield googleAuth_1.oAuth2Client.getToken(code);
        googleAuth_1.oAuth2Client.setCredentials(tokens);
        res.status(200).json({ message: 'Google Calendar integration successful!', tokens });
    }
    catch (error) {
        res.status(500).json({ message: 'Google authentication failed', error: error instanceof Error ? error.message : 'Unknown error' });
    }
}));
exports.default = router;
