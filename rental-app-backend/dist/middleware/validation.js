"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProperty = void 0;
const Joi = __importStar(require("joi"));
// Define the Joi validation schema
const propertySchema = Joi.object({
    title: Joi.string().required().messages({
        'string.base': 'Title must be a string',
        'any.required': 'Title is required',
    }),
    description: Joi.string().required().messages({
        'string.base': 'Description must be a string',
        'any.required': 'Description is required',
    }),
    address: Joi.string().required().messages({
        'string.base': 'Address must be a string',
        'any.required': 'Address is required',
    }),
    price: Joi.number().greater(0).required().messages({
        'number.base': 'Price must be a number',
        'number.greater': 'Price must be greater than zero',
        'any.required': 'Price is required',
    }),
    landlord: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Landlord ID must be a string',
        'string.pattern.base': 'Landlord ID must be a valid ObjectId',
        'any.required': 'Landlord ID is required',
    }),
    images: Joi.array().items(Joi.string()).optional().messages({
        'array.base': 'Images must be an array of strings',
        'string.base': 'Each image must be a string',
    }),
    propertyType: Joi.string().valid('Apartment', 'House', 'Studio', 'Condo').optional().messages({
        'string.base': 'Property type must be a string',
        'any.only': 'Property type must be one of the following: Apartment, House, Studio, Condo',
    }),
    bedrooms: Joi.number().integer().min(1).optional().messages({
        'number.base': 'Bedrooms must be a number',
        'number.integer': 'Bedrooms must be an integer',
        'number.min': 'Bedrooms must be at least 1',
    }),
});
// Middleware function
const validateProperty = (req, res, next) => {
    const { error } = propertySchema.validate(req.body, { abortEarly: false });
    if (error) {
        res.status(400).json({
            errors: error.details.map((detail) => ({
                message: detail.message,
                path: detail.path,
            })),
        });
    }
    else {
        next();
    }
};
exports.validateProperty = validateProperty;
