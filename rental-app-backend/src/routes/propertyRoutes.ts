import { Router } from 'express';
import { Property } from '../models/Property'; // Use named import
import {
    createProperty,
    getPropertyById,
    updatePropertyById,
    deletePropertyById
} from '../controllers/propertyController'; // Import the controller functions

const router = Router();

// Create a new property
router.post('/', createProperty);

// Get property by ID
router.get('/:id', getPropertyById);

// Update property by ID
router.put('/:id', updatePropertyById);

// Delete property by ID
router.delete('/:id', deletePropertyById);

export default router; // Ensure this is a default export
