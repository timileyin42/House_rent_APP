"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProperty = void 0;
const joi_1 = __importDefault(require("joi"));
// Define the Joi validation schema
const propertySchema = joi_1.default.object({
    title: joi_1.default.string().required().messages({
        'string.base': 'Title must be a string',
        'any.required': 'Title is required',
    }),
    description: joi_1.default.string().required().messages({
        'string.base': 'Description must be a string',
        'any.required': 'Description is required',
    }),
    address: joi_1.default.string().required().messages({
        'string.base': 'Address must be a string',
        'any.required': 'Address is required',
    }),
    price: joi_1.default.number().greater(0).required().messages({
        'number.base': 'Price must be a number',
        'number.greater': 'Price must be greater than zero',
        'any.required': 'Price is required',
    }),
    landlord: joi_1.default.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Landlord ID must be a string',
        'string.pattern.base': 'Landlord ID must be a valid ObjectId',
        'any.required': 'Landlord ID is required',
    }),
    images: joi_1.default.array().items(joi_1.default.string()).optional().messages({
        'array.base': 'Images must be an array of strings',
        'string.base': 'Each image must be a string',
    }),
    propertyType: joi_1.default.string().valid('Apartment', 'House', 'Studio', 'Condo').optional().messages({
        'string.base': 'Property type must be a string',
        'any.only': 'Property type must be one of the following: Apartment, House, Studio, Condo',
    }),
    bedrooms: joi_1.default.number().integer().min(1).optional().messages({
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
