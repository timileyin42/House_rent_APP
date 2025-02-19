import express, { Request, Response } from 'express';
import { oAuth2Client } from '../config/googleAuth';

const router = express.Router();

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
router.get('/auth/google', (req: Request, res: Response) => {
    try {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/calendar'],
        });
        res.redirect(authUrl);
    } catch (error) {
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
router.get('/auth/google/callback', async (req: Request, res: Response): Promise<void> => {
    try {
        const code = req.query.code as string;
        if (!code) {
            res.status(400).json({ message: 'Authorization code is missing' });
            return;
        }

        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);

        res.status(200).json({ message: 'Google Calendar integration successful!', tokens });
    } catch (error) {
        res.status(500).json({ message: 'Google authentication failed', error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

export default router;
