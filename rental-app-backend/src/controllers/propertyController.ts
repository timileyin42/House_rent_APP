import { Request as ExpressRequest, Response } from 'express';
import { AuthRequest } from '../types/AuthRequest';
import { Property } from '../models/Property'; // Adjust the import based on your project structure
import { UserActivity } from '../models/UserActivity'; // Import the UserActivity model


// Function to create a new property
export const createProperty = async (req: AuthRequest, res: Response): Promise<void> => {
    const { title, description, price, address, landlord, images } = req.body;

    try {
        // Check for duplicate listings
        const existingProperty = await Property.findOne({ title, address, landlord });
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
        const property = await Property.create({ title, description, price, address, landlord, images });

        // Log user activity
        await UserActivity.create({ userId: landlord, action: 'created_listing' });

        res.status(201).json(property); // Respond with the created property
    } catch (error) {
        console.error('Error creating property:', error);
        res.status(500).json({
            message: 'Server error',
            error: (error as Error).message,
        });
    }
};

// Function to search for properties
export const searchProperties = async (req: AuthRequest, res: Response): Promise<void> => {
    const { title, price, address } = req.query; // Get search parameters from query
    const userId = req.user?._id; // Assuming you have user info in req.user after authentication

    try {
        // Build the search criteria
        const searchCriteria: any = {};
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
        const properties = await Property.find(searchCriteria);

        // Log user activity for searching properties
        if (userId) {
            await UserActivity.create({ userId, action: 'searched_properties', criteria: searchCriteria });
        }

        if (properties.length === 0) {
            res.status(404).json({ message: 'No properties found matching the criteria.' });
            return;
        }

        res.status(200).json(properties);
    } catch (error) {
        console.error('Error searching properties:', error);
        res.status(500).json({
            message: 'Server error',
            error: (error as Error).message,
        });
    }
};


// Function to get a property by ID
export const getPropertyById = async (req: AuthRequest, res: Response): Promise<void> => {
    console.log(`GET /api/properties/${req.params.id} called`);
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            console.log('Property not found.');
            res.status(404).json({ message: 'Property not found' });
            return;
        }
        console.log('Property found:', property);

        // Log user activity for viewing the property
        await UserActivity.create({ userId: property.landlord, action: 'viewed_property' });

        res.status(200).json(property);
    } catch (error) {
        console.error('Error fetching property:', error);
        res.status(500).json({
            message: 'Server error',
            error: (error as Error).message,
        });
    }
};


// Function to update a property by ID
export const updatePropertyById = async (req: AuthRequest, res: Response): Promise<void> => {
    console.log(`PUT /api/properties/${req.params.id} called with data:`, req.body);
    try {
        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProperty) {
            console.log('Property not found for update.');
            res.status(404).json({ message: 'Property not found' });
            return;
        }
        console.log('Property updated:', updatedProperty);

        // Log user activity for updating the property
        await UserActivity.create({ userId: updatedProperty.landlord, action: 'updated_listing' });

        res.status(200).json(updatedProperty);
    } catch (error) {
        console.error('Error updating property:', error);
        res.status(500).json({
            message: 'Server error',
            error: (error as Error).message,
        });
    }
};


// Function to delete a property by ID
export const deletePropertyById = async (req: AuthRequest, res: Response): Promise<void> => {
    console.log(`DELETE /api/properties/${req.params.id} called`);
    try {
        const deletedProperty = await Property.findByIdAndDelete(req.params.id);
        if (!deletedProperty) {
            console.log('Property not found for deletion.');
            res.status(404).json({ message: 'Property not found' });
            return;
        }
        console.log('Property deleted:', deletedProperty);

        // Log user activity for deleting the property
        await UserActivity.create({ userId: deletedProperty.landlord, action: 'deleted_listing' });

        res.status(200).json({ message: 'Property deleted' });
    } catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).json({
            message: 'Server error',
            error: (error as Error).message,
        });
    }
};

// Function to track property views
export const trackPropertyView = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const property = await Property.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });

        if (!property) {
            res.status(404).json({ message: 'Property not found' });
            return;
        }

        // Log user activity for viewing the property
        await UserActivity.create({ userId: property.landlord, action: 'viewed_property' });

        res.status(200).json(property);
    } catch (error) {
        console.error('Error tracking property view:', error);
        res.status(500).json({
            message: 'Server error',
            error: (error as Error).message,
        });
    }
};

// Function to track property inquiries
export const trackPropertyInquiry = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const property = await Property.findByIdAndUpdate(id, { $inc: { inquiries: 1 } }, { new: true });

        if (!property) {
            res.status(404).json({ message: 'Property not found' });
            return;
        }

        // Log user activity for inquiring about the property
        await UserActivity.create({ userId: property.landlord, action: 'inquired_property' });

        res.status(200).json(property);
    } catch (error) {
        console.error('Error tracking property inquiry:', error);
        res.status(500).json({
            message: 'Server error',
            error: (error as Error).message,
        });
    }
};

// Function to get analytics for a property
export const getPropertyAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
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
            error: (error as Error).message,
        });
    }
};
