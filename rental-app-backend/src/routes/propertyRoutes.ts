import { Router } from 'express';
import {
  createProperty,
  getPropertyById,
  updatePropertyById,
  deletePropertyById,
  searchProperties,
} from '../controllers/propertyController';
import { validateProperty } from '../middleware/validation';

const router = Router();

// Search for properties
router.get('/search', searchProperties); 

// Get property by ID
router.get('/:id', getPropertyById);

// Create a new property
router.post('/', validateProperty, createProperty);

// Update property by ID
router.put('/:id', updatePropertyById);

// Delete property by ID
router.delete('/:id', deletePropertyById);

export default router;

