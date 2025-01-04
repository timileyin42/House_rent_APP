import { Request, Response } from 'express';
import {Property } from '../models/Property'; // Adjust the import based on your project structure

// Function to create a new property
export const createProperty = async (req: Request, res: Response): Promise<void> => {
    const { title, description, price, address, landlord, images } = req.body;

    try {
        // Create a new property
        const property = await Property.create({ title, description, price, address, landlord, images });
        res.status(201).json(property); // Respond with the created property
    } catch (error) {
        console.error('Error creating property:', error);
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : error,
        });
    }
};

// Function to get a property by ID
export const getPropertyById = async (req: Request, res: Response): Promise<void> => {
    console.log(`GET /api/properties/${req.params.id} called`);
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            console.log('Property not found.');
            res.status(404).json({ message: 'Property not found' });
            return;
        }
        console.log('Property found:', property);
        res.status(200).json(property);
    } catch (error) {
        console.error('Error fetching property:', error);
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : error,
        });
    }
};

// Function to update a property by ID
export const updatePropertyById = async (req: Request, res: Response): Promise<void> => {
    console.log(`PUT /api/properties/${req.params.id} called with data:`, req.body);
    try {
        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProperty) {
            console.log('Property not found for update.');
            res.status(404).json({ message: 'Property not found' });
            return;
        }
        console.log('Property updated:', updatedProperty);
        res.status(200).json(updatedProperty);
    } catch (error) {
        console.error('Error updating property:', error);
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : error,
        });
    }
};

// Function to delete a property by ID
export const deletePropertyById = async (req: Request, res: Response): Promise<void> => {
    console.log(`DELETE /api/properties/${req.params.id} called`);
    try {
        const deletedProperty = await Property.findByIdAndDelete(req.params.id);
        if (!deletedProperty) {
            console.log('Property not found for deletion.');
            res.status(404).json({ message: 'Property not found' });
            return;
        }
        console.log('Property deleted:', deletedProperty);
        res.status(200).json({ message: 'Property deleted' });
    } catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const searchProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const { priceMin, priceMax, location, propertyType, bedrooms } = req.query;

    // Build a query object dynamically based on filters provided
    const query: any = {};
    if (priceMin) query.price = { ...query.price, $gte: Number(priceMin) };
    if (priceMax) query.price = { ...query.price, $lte: Number(priceMax) };
    if (location) query.address = { $regex: new RegExp(location as string, 'i') }; // Case-insensitive match
    if (propertyType) query.propertyType = propertyType;
    if (bedrooms) query.bedrooms = Number(bedrooms);

    // Fetch properties based on the query
    const properties = await Property.find(query);

    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Function to track property views
export const trackPropertyView = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const property = await Property.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });

    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }

    res.status(200).json(property);
  } catch (error) {
    console.error('Error tracking property view:', error);
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Function to track property inquiries
export const trackPropertyInquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const property = await Property.findByIdAndUpdate(id, { $inc: { inquiries: 1 } }, { new: true });

    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }

    res.status(200).json(property);
  } catch (error) {
    console.error('Error tracking property inquiry:', error);
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Function to get analytics for a property
export const getPropertyAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);

    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }

    res.status(200).json({
      views: property.views,
      inquiries: property.inquiries,
    });
  } catch (error) {
    console.error('Error fetching property analytics:', error);
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : error,
    });
  }
};
