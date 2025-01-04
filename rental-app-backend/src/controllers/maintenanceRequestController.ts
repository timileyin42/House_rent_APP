import { Request, Response } from 'express';
import { MaintenanceRequest } from '../models/MaintenanceRequest';

export const createMaintenanceRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { tenant, property, description } = req.body;

        if (!tenant || !property || !description) {
            res.status(400).json({ message: 'All fields are required.' });
            return;
        }

        const newRequest = new MaintenanceRequest({ tenant, property, description });
        const savedRequest = await newRequest.save();

        res.status(201).json({ message: 'Maintenance request submitted successfully.', data: savedRequest });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting maintenance request', error });
    }
};

export const getMaintenanceRequests = async (req: Request, res: Response): Promise<void> => {
    try {
        const { tenantId } = req.params;

        if (!tenantId) {
            res.status(400).json({ message: 'Tenant ID is required.' });
            return;
        }

        const requests = await MaintenanceRequest.find({ tenant: tenantId })
            .populate('property', 'title address')
            .sort({ createdAt: -1 });

        res.status(200).json({ message: 'Maintenance requests retrieved successfully.', data: requests });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving maintenance requests', error });
    }
};

