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
exports.getUserActivities = exports.rejectProperty = exports.approveProperty = exports.getPendingProperties = void 0;
const Property_1 = require("../models/Property");
const UserActivity_1 = require("../models/UserActivity");
// Get all pending properties
const getPendingProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const properties = yield Property_1.Property.find({ status: 'pending' });
        res.status(200).json(properties);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
exports.getPendingProperties = getPendingProperties;
// Approve a property
const approveProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const property = yield Property_1.Property.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
        if (!property) {
            res.status(404).json({ message: 'Property not found' });
            return; // Exit the function early
        }
        res.status(200).json(property);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
exports.approveProperty = approveProperty;
// Reject a property
const rejectProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const property = yield Property_1.Property.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
        if (!property) {
            res.status(404).json({ message: 'Property not found' });
            return; // Exit the function early
        }
        res.status(200).json(property);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
exports.rejectProperty = rejectProperty;
// Get user activities
const getUserActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activities = yield UserActivity_1.UserActivity.find().populate('userId'); // Populate userId to get user details
        res.status(200).json(activities);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
exports.getUserActivities = getUserActivities;
