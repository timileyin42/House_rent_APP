import { Router } from 'express';
import { addReview, getReviewsForProperty } from '../controllers/reviewController';

const router = Router();

// Add a review
router.post('/', addReview);

// Get reviews for a specific property
router.get('/property/:propertyId', getReviewsForProperty);

export default router;
