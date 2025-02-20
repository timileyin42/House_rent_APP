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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPropertyAnalytics = exports.trackPropertyInquiry = exports.trackPropertyView = exports.deletePropertyById = exports.updatePropertyById = exports.getPropertyById = exports.searchProperties = exports.createProperty = void 0;
var Property_1 = require("../models/Property"); // Import the Property model
var UserActivity_1 = require("../models/UserActivity"); // Import the UserActivity model
var axios_1 = require("axios"); // For making HTTP requests to geocoding API
var dotenv_1 = require("dotenv"); // Import dotenv to use environment variables
dotenv_1.default.config(); // Load environment variables from .env file
// Geocoding API configuration
var GEOCODING_API_KEY = process.env.GEOCODING_API_KEY; // Use API key from .env
var GEOCODING_API_URL = process.env.GEOCODING_API_URL; // Use API URL from .env
// Function to create a new property with geocoding
var createProperty = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, price, address, landlord, images, propertyType, bedrooms, existingProperty, geocodeResponse, _b, latitude, longitude, property, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, title = _a.title, description = _a.description, price = _a.price, address = _a.address, landlord = _a.landlord, images = _a.images, propertyType = _a.propertyType, bedrooms = _a.bedrooms;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                return [4 /*yield*/, Property_1.Property.findOne({ title: title, address: address, landlord: landlord })];
            case 2:
                existingProperty = _c.sent();
                if (existingProperty) {
                    res.status(400).json({ message: 'Duplicate property listing detected.' });
                    return [2 /*return*/];
                }
                // Verification checks
                if (!images || images.length < 1) {
                    res.status(400).json({ message: 'At least one image is required.' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, axios_1.default.get(GEOCODING_API_URL, {
                        params: {
                            address: address,
                            key: GEOCODING_API_KEY,
                        },
                    })];
            case 3:
                geocodeResponse = _c.sent();
                _b = geocodeResponse.data.results[0].geometry.location, latitude = _b.lat, longitude = _b.lng;
                return [4 /*yield*/, Property_1.Property.create({
                        title: title,
                        description: description,
                        price: price,
                        address: address,
                        latitude: latitude,
                        longitude: longitude,
                        landlord: landlord,
                        images: images,
                        propertyType: propertyType,
                        bedrooms: bedrooms,
                    })];
            case 4:
                property = _c.sent();
                // Log user activity
                return [4 /*yield*/, UserActivity_1.UserActivity.create({ userId: landlord, action: 'created_listing' })];
            case 5:
                // Log user activity
                _c.sent();
                res.status(201).json(property); // Respond with the created property
                return [3 /*break*/, 7];
            case 6:
                error_1 = _c.sent();
                console.error('Error creating property:', error_1);
                res.status(500).json({
                    message: 'Server error',
                    error: error_1.message,
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.createProperty = createProperty;
// Function to search for properties with coordinates
var searchProperties = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, price, address, latitude, longitude, radius, userId, searchCriteria, properties, error_2;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, title = _a.title, price = _a.price, address = _a.address, latitude = _a.latitude, longitude = _a.longitude, radius = _a.radius;
                userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 5, , 6]);
                searchCriteria = {};
                if (title) {
                    searchCriteria.title = { $regex: title, $options: 'i' }; // Case-insensitive search
                }
                if (price) {
                    searchCriteria.price = price; // You can add more complex logic for price range if needed
                }
                if (address) {
                    searchCriteria.address = { $regex: address, $options: 'i' }; // Case-insensitive search
                }
                // Add geospatial search if latitude, longitude, and radius are provided
                if (latitude && longitude && radius) {
                    searchCriteria.location = {
                        $near: {
                            $geometry: {
                                type: 'Point',
                                coordinates: [parseFloat(longitude), parseFloat(latitude)],
                            },
                            $maxDistance: parseFloat(radius) * 1000, // Convert radius to meters
                        },
                    };
                }
                return [4 /*yield*/, Property_1.Property.find(searchCriteria)];
            case 2:
                properties = _c.sent();
                if (!userId) return [3 /*break*/, 4];
                return [4 /*yield*/, UserActivity_1.UserActivity.create({ userId: userId, action: 'searched_properties', criteria: searchCriteria })];
            case 3:
                _c.sent();
                _c.label = 4;
            case 4:
                if (properties.length === 0) {
                    res.status(404).json({ message: 'No properties found matching the criteria.' });
                    return [2 /*return*/];
                }
                res.status(200).json(properties);
                return [3 /*break*/, 6];
            case 5:
                error_2 = _c.sent();
                console.error('Error searching properties:', error_2);
                res.status(500).json({
                    message: 'Server error',
                    error: error_2.message,
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.searchProperties = searchProperties;
// Function to get a property by ID
var getPropertyById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var property, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("GET /api/properties/".concat(req.params.id, " called"));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Property_1.Property.findById(req.params.id)];
            case 2:
                property = _a.sent();
                if (!property) {
                    console.log('Property not found.');
                    res.status(404).json({ message: 'Property not found' });
                    return [2 /*return*/];
                }
                console.log('Property found:', property);
                // Log user activity for viewing the property
                return [4 /*yield*/, UserActivity_1.UserActivity.create({ userId: property.landlord, action: 'viewed_property' })];
            case 3:
                // Log user activity for viewing the property
                _a.sent();
                res.status(200).json(property);
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                console.error('Error fetching property:', error_3);
                res.status(500).json({
                    message: 'Server error',
                    error: error_3.message,
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getPropertyById = getPropertyById;
// Function to update a property by ID
var updatePropertyById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedProperty, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("PUT /api/properties/".concat(req.params.id, " called with data:"), req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Property_1.Property.findByIdAndUpdate(req.params.id, req.body, { new: true })];
            case 2:
                updatedProperty = _a.sent();
                if (!updatedProperty) {
                    console.log('Property not found for update.');
                    res.status(404).json({ message: 'Property not found' });
                    return [2 /*return*/];
                }
                console.log('Property updated:', updatedProperty);
                // Log user activity for updating the property
                return [4 /*yield*/, UserActivity_1.UserActivity.create({ userId: updatedProperty.landlord, action: 'updated_listing' })];
            case 3:
                // Log user activity for updating the property
                _a.sent();
                res.status(200).json(updatedProperty);
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                console.error('Error updating property:', error_4);
                res.status(500).json({
                    message: 'Server error',
                    error: error_4.message,
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updatePropertyById = updatePropertyById;
// Function to delete a property by ID
var deletePropertyById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedProperty, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("DELETE /api/properties/".concat(req.params.id, " called"));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Property_1.Property.findByIdAndDelete(req.params.id)];
            case 2:
                deletedProperty = _a.sent();
                if (!deletedProperty) {
                    console.log('Property not found for deletion.');
                    res.status(404).json({ message: 'Property not found' });
                    return [2 /*return*/];
                }
                console.log('Property deleted:', deletedProperty);
                // Log user activity for deleting the property
                return [4 /*yield*/, UserActivity_1.UserActivity.create({ userId: deletedProperty.landlord, action: 'deleted_listing' })];
            case 3:
                // Log user activity for deleting the property
                _a.sent();
                res.status(200).json({ message: 'Property deleted' });
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                console.error('Error deleting property:', error_5);
                res.status(500).json({
                    message: 'Server error',
                    error: error_5.message,
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deletePropertyById = deletePropertyById;
// Function to track property views
var trackPropertyView = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, property, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, Property_1.Property.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })];
            case 1:
                property = _a.sent();
                if (!property) {
                    res.status(404).json({ message: 'Property not found' });
                    return [2 /*return*/];
                }
                // Log user activity for viewing the property
                return [4 /*yield*/, UserActivity_1.UserActivity.create({ userId: property.landlord, action: 'viewed_property' })];
            case 2:
                // Log user activity for viewing the property
                _a.sent();
                res.status(200).json(property);
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.error('Error tracking property view:', error_6);
                res.status(500).json({
                    message: 'Server error',
                    error: error_6.message,
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.trackPropertyView = trackPropertyView;
// Function to track property inquiries
var trackPropertyInquiry = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, property, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, Property_1.Property.findByIdAndUpdate(id, { $inc: { inquiries: 1 } }, { new: true })];
            case 1:
                property = _a.sent();
                if (!property) {
                    res.status(404).json({ message: 'Property not found' });
                    return [2 /*return*/];
                }
                // Log user activity for inquiring about the property
                return [4 /*yield*/, UserActivity_1.UserActivity.create({ userId: property.landlord, action: 'inquired_property' })];
            case 2:
                // Log user activity for inquiring about the property
                _a.sent();
                res.status(200).json(property);
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                console.error('Error tracking property inquiry:', error_7);
                res.status(500).json({
                    message: 'Server error',
                    error: error_7.message,
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.trackPropertyInquiry = trackPropertyInquiry;
// Function to get analytics for a property
var getPropertyAnalytics = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, property, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, Property_1.Property.findById(id)];
            case 1:
                property = _a.sent();
                if (!property) {
                    res.status(404).json({ message: 'Property not found' });
                    return [2 /*return*/];
                }
                res.status(200).json({
                    views: property.views,
                    inquiries: property.inquiries,
                });
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                console.error('Error fetching property analytics:', error_8);
                res.status(500).json({
                    message: 'Server error',
                    error: error_8.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPropertyAnalytics = getPropertyAnalytics;
