import { Request, Response } from 'express';
import { Property } from '../models/Property';
import { UserActivity } from '../models/UserActivity';

// Get all pending properties
export const getPendingProperties = async (req: Request, res: Response): Promise<void> => {
    try {
        const properties = await Property.find({ status: 'pending' });
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: (error as Error).message });
    }
};

// Approve a property
export const approveProperty = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const property = await Property.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
        if (!property) {
            res.status(404).json({ message: 'Property not found' });
            return; // Exit the function early
        }
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: (error as Error).message });
    }
};

// Reject a property
export const rejectProperty = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const property = await Property.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
        if (!property) {
            res.status(404).json({ message: 'Property not found' });
            return; // Exit the function early
        }
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: (error as Error).message });
    }
};

// Get user activities
export const getUserActivities = async (req: Request, res: Response): Promise<void> => {
    try {
        const activities = await UserActivity.find().populate('userId'); // Populate userId to get user details
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: (error as Error).message });
    }
};
