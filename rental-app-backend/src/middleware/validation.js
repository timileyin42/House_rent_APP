"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProperty = void 0;
var Joi = require("joi");
// Define the Joi validation schema
var propertySchema = Joi.object({
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
var validateProperty = function (req, res, next) {
    var error = propertySchema.validate(req.body, { abortEarly: false }).error;
    if (error) {
        res.status(400).json({
            errors: error.details.map(function (detail) { return ({
                message: detail.message,
                path: detail.path,
            }); }),
        });
    }
    else {
        next();
    }
};
exports.validateProperty = validateProperty;
