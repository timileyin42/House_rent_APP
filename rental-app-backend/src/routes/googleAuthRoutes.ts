import express, { Request, Response } from 'express';
import { oAuth2Client } from '../config/googleAuth';

const router = express.Router();

router.get('/auth/google', (req: Request, res: Response) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar'],
    });
    res.redirect(authUrl);
});

// Handle OAuth callback
router.get('/auth/google/callback', async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // Save tokens (in database or env)
    res.json({ message: 'Google Calendar integration successful!', tokens });
});

export default router;