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
exports.getPropertyAnalytics = exports.trackPropertyInquiry = exports.trackPropertyView = exports.deletePropertyById = exports.updatePropertyById = exports.getPropertyById = exports.searchProperties = exports.createProperty = void 0;
const Property_1 = require("../models/Property"); // Adjust the import based on your project structure
const UserActivity_1 = require("../models/UserActivity"); // Import the UserActivity model
// Function to create a new property
const createProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price, address, landlord, images } = req.body;
    try {
        // Check for duplicate listings
        const existingProperty = yield Property_1.Property.findOne({ title, address, landlord });
        if (existingProperty) {
            res.status(400).json({ message: 'Duplicate property listing detected.' });
            return;
        }
        // Verification checks
        if (!images || images.length < 1) {
            res.status(400).json({ message: 'At least one image is required.' });
            return;
        }
        // Create a new property
        const property = yield Property_1.Property.create({ title, description, price, address, landlord, images });
        // Log user activity
        yield UserActivity_1.UserActivity.create({ userId: landlord, action: 'created_listing' });
        res.status(201).json(property); // Respond with the created property
    }
    catch (error) {
        console.error('Error creating property:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
});
exports.createProperty = createProperty;
// Function to search for properties
const searchProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, price, address } = req.query; // Get search parameters from query
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id; // Assuming you have user info in req.user after authentication
    try {
        // Build the search criteria
        const searchCriteria = {};
        if (title) {
            searchCriteria.title = { $regex: title, $options: 'i' }; // Case-insensitive search
        }
        if (price) {
            searchCriteria.price = price; // You can add more complex logic for price range if needed
        }
        if (address) {
            searchCriteria.address = { $regex: address, $options: 'i' }; // Case-insensitive search
        }
        // Find properties based on the search criteria
        const properties = yield Property_1.Property.find(searchCriteria);
        // Log user activity for searching properties
        if (userId) {
            yield UserActivity_1.UserActivity.create({ userId, action: 'searched_properties', criteria: searchCriteria });
        }
        if (properties.length === 0) {
            res.status(404).json({ message: 'No properties found matching the criteria.' });
            return;
        }
        res.status(200).json(properties);
    }
    catch (error) {
        console.error('Error searching properties:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
});
exports.searchProperties = searchProperties;
// Function to get a property by ID
const getPropertyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`GET /api/properties/${req.params.id} called`);
    try {
        const property = yield Property_1.Property.findById(req.params.id);
        if (!property) {
            console.log('Property not found.');
            res.status(404).json({ message: 'Property not found' });
            return;
        }
        console.log('Property found:', property);
        // Log user activity for viewing the property
        yield UserActivity_1.UserActivity.create({ userId: property.landlord, action: 'viewed_property' });
        res.status(200).json(property);
    }
    catch (error) {
        console.error('Error fetching property:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
});
exports.getPropertyById = getPropertyById;
// Function to update a property by ID
const updatePropertyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`PUT /api/properties/${req.params.id} called with data:`, req.body);
    try {
        const updatedProperty = yield Property_1.Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProperty) {
            console.log('Property not found for update.');
            res.status(404).json({ message: 'Property not found' });
            return;
        }
        console.log('Property updated:', updatedProperty);
        // Log user activity for updating the property
        yield UserActivity_1.UserActivity.create({ userId: updatedProperty.landlord, action: 'updated_listing' });
        res.status(200).json(updatedProperty);
    }
    catch (error) {
        console.error('Error updating property:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
});
exports.updatePropertyById = updatePropertyById;
// Function to delete a property by ID
const deletePropertyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`DELETE /api/properties/${req.params.id} called`);
    try {
        const deletedProperty = yield Property_1.Property.findByIdAndDelete(req.params.id);
        if (!deletedProperty) {
            console.log('Property not found for deletion.');
            res.status(404).json({ message: 'Property not found' });
            return;
        }
        console.log('Property deleted:', deletedProperty);
        // Log user activity for deleting the property
        yield UserActivity_1.UserActivity.create({ userId: deletedProperty.landlord, action: 'deleted_listing' });
        res.status(200).json({ message: 'Property deleted' });
    }
    catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
});
exports.deletePropertyById = deletePropertyById;
// Function to track property views
const trackPropertyView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const property = yield Property_1.Property.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
        if (!property) {
            res.status(404).json({ message: 'Property not found' });
            return;
        }
        // Log user activity for viewing the property
        yield UserActivity_1.UserActivity.create({ userId: property.landlord, action: 'viewed_property' });
        res.status(200).json(property);
    }
    catch (error) {
        console.error('Error tracking property view:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
});
exports.trackPropertyView = trackPropertyView;
// Function to track property inquiries
const trackPropertyInquiry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const property = yield Property_1.Property.findByIdAndUpdate(id, { $inc: { inquiries: 1 } }, { new: true });
        if (!property) {
            res.status(404).json({ message: 'Property not found' });
            return;
        }
        // Log user activity for inquiring about the property
        yield UserActivity_1.UserActivity.create({ userId: property.landlord, action: 'inquired_property' });
        res.status(200).json(property);
    }
    catch (error) {
        console.error('Error tracking property inquiry:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
});
exports.trackPropertyInquiry = trackPropertyInquiry;
// Function to get analytics for a property
const getPropertyAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const property = yield Property_1.Property.findById(id);
        if (!property) {
            res.status(404).json({ message: 'Property not found' });
            return;
        }
        res.status(200).json({
            views: property.views,
            inquiries: property.inquiries,
        });
    }
    catch (error) {
        console.error('Error fetching property analytics:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
});
exports.getPropertyAnalytics = getPropertyAnalytics;
