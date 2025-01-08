import { Request, Response } from 'express';
import Property from '../models/Property';

// Get all pending properties
export const getPendingProperties = async (req: Request, res: Response) => {
    try {
        const properties = await Property.find({ status: 'pending' });
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Approve a property
export const approveProperty = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const property = await Property.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Reject a property
export const rejectProperty = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const property = await Property.find
