import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

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
  landlord: Joi.string().required().messages({
    'string.base': 'Landlord ID must be a string',
    'any.required': 'Landlord ID is required',
  }),
  images: Joi.array().items(Joi.string()).optional().messages({
    'array.base': 'Images must be an array of strings',
    'string.base': 'Each image must be a string',
  }),
  propertyType: Joi.string().valid('Apartment', 'House', 'Condo').required().messages({
    'string.base': 'Property type must be a string',
    'any.required': 'Property type is required',
    'any.only': 'Property type must be one of the following: Apartment, House, Condo',
  }),
  bedrooms: Joi.number().integer().min(1).required().messages({
    'number.base': 'Bedrooms must be a number',
    'number.integer': 'Bedrooms must be an integer',
    'number.min': 'Bedrooms must be at least 1',
    'any.required': 'Bedrooms are required',
  }),
});

// Middleware function
export const validateProperty = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = propertySchema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(400).json({
      errors: error.details.map((detail) => ({
        message: detail.message,
        path: detail.path,
      })),
    });
  } else {
    next();
  }
};
