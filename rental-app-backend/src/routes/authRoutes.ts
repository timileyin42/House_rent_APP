import express, { Request, Response } from 'express';
import { registerUser , loginUser  } from '../controllers/authController';

const router = express.Router();

// Route for user registration
router.post('/register', async (req: Request, res: Response) => {
    try {
        await registerUser (req, res);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        } else {
            res.status(500).json({ message: 'Server error', error: 'Unknown error' });
        }
    }
});

// Route for user login
router.post('/login', async (req: Request, res: Response) => {
    try {
        await loginUser (req, res);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        } else {
            res.status(500).json({ message: 'Server error', error: 'Unknown error' });
        }
    }
});

export default router;
