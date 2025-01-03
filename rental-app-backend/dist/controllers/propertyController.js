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
exports.searchProperties = exports.deletePropertyById = exports.updatePropertyById = exports.getPropertyById = exports.createProperty = void 0;
const Property_1 = require("../models/Property"); // Adjust the import based on your project structure
// Function to create a new property
const createProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price, address, landlord, images } = req.body;
    try {
        // Create a new property
        const property = yield Property_1.Property.create({ title, description, price, address, landlord, images });
        res.status(201).json(property); // Respond with the created property
    }
    catch (error) {
        console.error('Error creating property:', error);
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.createProperty = createProperty;
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
        res.status(200).json(property);
    }
    catch (error) {
        console.error('Error fetching property:', error);
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : error,
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
        res.status(200).json(updatedProperty);
    }
    catch (error) {
        console.error('Error updating property:', error);
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : error,
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
        res.status(200).json({ message: 'Property deleted' });
    }
    catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.deletePropertyById = deletePropertyById;
const searchProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { priceMin, priceMax, location, propertyType, bedrooms } = req.query;
        // Build a query object dynamically based on filters provided
        const query = {};
        if (priceMin)
            query.price = Object.assign(Object.assign({}, query.price), { $gte: Number(priceMin) });
        if (priceMax)
            query.price = Object.assign(Object.assign({}, query.price), { $lte: Number(priceMax) });
        if (location)
            query.address = { $regex: new RegExp(location, 'i') }; // Case-insensitive match
        if (propertyType)
            query.propertyType = propertyType;
        if (bedrooms)
            query.bedrooms = Number(bedrooms);
        // Fetch properties based on the query
        const properties = yield Property_1.Property.find(query);
        res.status(200).json(properties);
    }
    catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.searchProperties = searchProperties;
