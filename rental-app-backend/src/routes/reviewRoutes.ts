import { Router } from 'express';
import {
    addReview,
    getReviewsForProperty,
    getReviewsForTenant,
} from '../controllers/reviewController';

const router = Router();

// Add a review
router.post('/', addReview);

// Get reviews for a specific property
router.get('/property/:propertyId', getReviewsForProperty);

// Get reviews for a specific tenant
router.get('/tenant/:tenantId', getReviewsForTenant);

export default router;

