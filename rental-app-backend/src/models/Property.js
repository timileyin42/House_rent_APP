"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
// Property.ts
var mongoose_1 = require("mongoose");
var PropertySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    landlord: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User ',
        required: true,
    },
    images: {
        type: [String],
        default: [],
    },
    propertyType: {
        type: String,
        enum: ['Apartment', 'House', 'Studio', 'Condo'],
    },
    bedrooms: {
        type: Number,
    },
    views: {
        type: Number,
        default: 0, // Initialize views to 0
    },
    inquiries: {
        type: Number,
        default: 0, // Initialize inquiries to 0
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending', // Default status is pending
    },
}, { timestamps: true } // Automatically creates `createdAt` and `updatedAt` fields
);
exports.Property = mongoose_1.default.model('Property', PropertySchema);
