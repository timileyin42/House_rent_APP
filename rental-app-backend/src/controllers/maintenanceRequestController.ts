import { Request, Response } from 'express';
import { MaintenanceRequest } from '../models/MaintenanceRequest';

// Create a maintenance request
export const createMaintenanceRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tenantId, landlordId, propertyId, description } = req.body;

    if (!tenantId || !landlordId || !propertyId || !description) {
      res.status(400).json({ message: 'All fields are required.' });
      return;
    }

    const newRequest = new MaintenanceRequest({ tenantId, landlordId, propertyId, description });
    const savedRequest = await newRequest.save();

    res.status(201).json({ message: 'Maintenance request created successfully.', data: savedRequest });
  } catch (error) {
    console.error('Error creating maintenance request:', error);
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Get maintenance requests for a user (tenant or landlord)
export const getMaintenanceRequests = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, role } = req.query; // `role` specifies tenant or landlord

    if (!userId || !role) {
      res.status(400).json({ message: 'User ID and role are required.' });
      return;
    }

    const filter = role === 'tenant' ? { tenantId: userId } : { landlordId: userId };
    const requests = await MaintenanceRequest.find(filter).populate('propertyId tenantId landlordId');

    res.status(200).json({ message: 'Maintenance requests retrieved successfully.', data: requests });
  } catch (error) {
    console.error('Error retrieving maintenance requests:', error);
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Update maintenance request status
export const updateMaintenanceRequestStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { requestId, status } = req.body;

    if (!requestId || !status) {
      res.status(400).json({ message: 'Request ID and status are required.' });
      return;
    }

    const updatedRequest = await MaintenanceRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      res.status(404).json({ message: 'Maintenance request not found.' });
      return;
    }

    res.status(200).json({ message: 'Maintenance request status updated successfully.', data: updatedRequest });
  } catch (error) {
    console.error('Error updating maintenance request status:', error);
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Delete a maintenance request
export const deleteMaintenanceRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { requestId } = req.params;

    if (!requestId) {
      res.status(400).json({ message: 'Request ID is required.' });
      return;
    }

    const deletedRequest = await MaintenanceRequest.findByIdAndDelete(requestId);

    if (!deletedRequest) {
      res.status(404).json({ message: 'Maintenance request not found.' });
      return;
    }

    res.status(200).json({ message: 'Maintenance request deleted successfully.' });
  } catch (error) {
    console.error('Error deleting maintenance request:', error);
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : error,
    });
  }
};

