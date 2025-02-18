import { Router } from 'express';
import {
  createProperty,
  getPropertyById,
  updatePropertyById,
  deletePropertyById,
  searchProperties,
  trackPropertyView,
  trackPropertyInquiry,
  getPropertyAnalytics,
} from '../controllers/propertyController';
import { validateProperty } from '../middleware/validation';
import protect from '../middleware/authMiddleware'; // Ensure user is authenticated
import { landlordOnly } from '../middleware/roleMiddleware'; // Role-based access control

const router = Router();

// Search for properties (open to all)
router.get('/search', searchProperties); // Ensure searchProperties is correctly defined

// Get property by ID (open to all)
router.get('/:id', getPropertyById); // Ensure getPropertyById is correctly defined

// Track property view (open to all)
router.post('/:id/view', trackPropertyView); // Ensure trackPropertyView is correctly defined

// Track property inquiry (open to all)
router.post('/:id/inquiry', trackPropertyInquiry); // Ensure trackPropertyInquiry is correctly defined

// Get property analytics (restricted to landlords)
router.get('/:id/analytics', protect, landlordOnly, getPropertyAnalytics); // Ensure getPropertyAnalytics is correctly defined

// Create a new property (restricted to landlords)
router.post('/', protect, landlordOnly, validateProperty, createProperty); // Ensure createProperty is correctly defined

// Update property by ID (restricted to landlords)
router.put('/:id', protect, landlordOnly, updatePropertyById); // Ensure updatePropertyById is correctly defined

// Delete property by ID (restricted to landlords)
router.delete('/:id', protect, landlordOnly, deletePropertyById); // Ensure deletePropertyById is correctly defined

export default router;
