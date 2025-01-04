import { Request, Response } from 'express';
import { Message } from '../models/Message';

export const getLandlordMessages = async (req: Request, res: Response): Promise<void> => {
    try {
        const { landlordId } = req.params;

        if (!landlordId) {
            res.status(400).json({ message: 'Landlord ID is required.' });
            return;
        }

        const messages = await Message.find()
            .populate('property', 'landlord')
            .populate('sender', 'name email')
            .populate('recipient', 'name email')
            .where('property.landlord')
            .equals(landlordId);

        res.status(200).json({ message: 'Messages retrieved successfully.', data: messages });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving messages', error });
    }
};

// Send a new message
export const sendMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { sender, recipient, property, content } = req.body;

        // Validation (optional, but you can add custom validation logic here)
        if (!sender || !recipient || !property || !content) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        const newMessage = new Message({ sender, recipient, property, content });
        const savedMessage = await newMessage.save();

        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error });
    }
};

// Get all messages
export const getMessages = async (_req: Request, res: Response): Promise<void> => {
    try {
        const messages = await Message.find()
            .populate('sender', 'name email')
            .populate('recipient', 'name email')
            .populate('property', 'title address');
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
};

