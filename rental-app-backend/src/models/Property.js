"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
var mongoose_1 = require("mongoose");
var PropertySchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: false }, // New field
    longitude: { type: Number, required: false }, // New field
    price: { type: Number, required: true },
    landlord: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    images: { type: [String], default: [] },
    propertyType: { type: String, enum: ['Apartment', 'House', 'Studio', 'Condo'] },
    bedrooms: { type: Number },
    views: { type: Number, default: 0 },
    inquiries: { type: Number, default: 0 },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });
exports.Property = mongoose_1.default.model('Property', PropertySchema);
