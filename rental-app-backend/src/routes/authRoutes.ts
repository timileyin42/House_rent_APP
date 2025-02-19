import express, { Request, Response } from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { getAllUsers, getUserById } from '../controllers/userController';

const router = express.Router();

// Route for user registration
router.post('/register', async (req: Request, res: Response) => {
    try {
        await registerUser(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

// Route for user login
router.post('/login', async (req: Request, res: Response) => {
    try {
        await loginUser(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

// Route to fetch all users
router.get('/users', async (req: Request, res: Response) => {
    try {
        await getAllUsers(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

// Route to fetch a user by ID
router.get('/users/:id', async (req: Request, res: Response) => {
    try {
        await getUserById(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

export default router;
