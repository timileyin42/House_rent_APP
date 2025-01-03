import { Router } from 'express';
import {
  createProperty,
  getPropertyById,
  updatePropertyById,
  deletePropertyById,
  searchProperties,
} from '../controllers/propertyController';
import { validateProperty } from '../middleware/validation';
import protect from '../middleware/authMiddleware'; // Ensure user is authenticated
import { landlordOnly } from '../middleware/roleMiddleware'; // Role-based access control

const router = Router();

// Search for properties (open to all)
router.get('/search', searchProperties);

// Get property by ID (open to all)
router.get('/:id', getPropertyById);

// Create a new property (restricted to landlords)
router.post('/', protect, landlordOnly, validateProperty, createProperty);

// Update property by ID (restricted to landlords)
router.put('/:id', protect, landlordOnly, updatePropertyById);

// Delete property by ID (restricted to landlords)
router.delete('/:id', protect, landlordOnly, deletePropertyById);

export default router;

