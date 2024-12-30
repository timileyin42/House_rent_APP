import express, { Request, Response } from 'express';
import { Message } from '../models/Message';

const router = express.Router();

// Send a new message
router.post('/', async (req: Request, res: Response) => {
    try {
        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error });
    }
});

// Get all messages
router.get('/', async (req: Request, res: Response) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
});

export default router;

