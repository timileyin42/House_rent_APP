"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMaintenanceRequest = exports.updateMaintenanceRequestStatus = exports.getMaintenanceRequests = exports.createMaintenanceRequest = void 0;
const maintenanceRequest_1 = require("../models/maintenanceRequest");
// Create a maintenance request
const createMaintenanceRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tenantId, landlordId, propertyId, description } = req.body;
        if (!tenantId || !landlordId || !propertyId || !description) {
            res.status(400).json({ message: 'All fields are required.' });
            return;
        }
        const newRequest = new maintenanceRequest_1.MaintenanceRequest({ tenantId, landlordId, propertyId, description });
        const savedRequest = yield newRequest.save();
        res.status(201).json({ message: 'Maintenance request created successfully.', data: savedRequest });
    }
    catch (error) {
        console.error('Error creating maintenance request:', error);
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.createMaintenanceRequest = createMaintenanceRequest;
// Get maintenance requests for a user (tenant or landlord)
const getMaintenanceRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, role } = req.query; // `role` specifies tenant or landlord
        if (!userId || !role) {
            res.status(400).json({ message: 'User ID and role are required.' });
            return;
        }
        const filter = role === 'tenant' ? { tenantId: userId } : { landlordId: userId };
        const requests = yield maintenanceRequest_1.MaintenanceRequest.find(filter).populate('propertyId tenantId landlordId');
        res.status(200).json({ message: 'Maintenance requests retrieved successfully.', data: requests });
    }
    catch (error) {
        console.error('Error retrieving maintenance requests:', error);
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getMaintenanceRequests = getMaintenanceRequests;
// Update maintenance request status
const updateMaintenanceRequestStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { requestId, status } = req.body;
        if (!requestId || !status) {
            res.status(400).json({ message: 'Request ID and status are required.' });
            return;
        }
        const updatedRequest = yield maintenanceRequest_1.MaintenanceRequest.findByIdAndUpdate(requestId, { status }, { new: true });
        if (!updatedRequest) {
            res.status(404).json({ message: 'Maintenance request not found.' });
            return;
        }
        res.status(200).json({ message: 'Maintenance request status updated successfully.', data: updatedRequest });
    }
    catch (error) {
        console.error('Error updating maintenance request status:', error);
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.updateMaintenanceRequestStatus = updateMaintenanceRequestStatus;
// Delete a maintenance request
const deleteMaintenanceRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { requestId } = req.params;
        if (!requestId) {
            res.status(400).json({ message: 'Request ID is required.' });
            return;
        }
        const deletedRequest = yield maintenanceRequest_1.MaintenanceRequest.findByIdAndDelete(requestId);
        if (!deletedRequest) {
            res.status(404).json({ message: 'Maintenance request not found.' });
            return;
        }
        res.status(200).json({ message: 'Maintenance request deleted successfully.' });
    }
    catch (error) {
        console.error('Error deleting maintenance request:', error);
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.deleteMaintenanceRequest = deleteMaintenanceRequest;
