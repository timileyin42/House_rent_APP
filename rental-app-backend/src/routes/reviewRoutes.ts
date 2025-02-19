import { Router } from 'express';
import {
    addReview,
    getReviewsForProperty,
    getReviewsForTenant,
} from '../controllers/reviewController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Endpoints for managing property and tenant reviews.
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Add a review
 *     description: Submit a review for a property or tenant.
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reviewerId:
 *                 type: string
 *                 description: ID of the user submitting the review.
 *               propertyId:
 *                 type: string
 *                 description: ID of the property being reviewed (optional).
 *               tenantId:
 *                 type: string
 *                 description: ID of the tenant being reviewed (optional).
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Rating between 1 and 5.
 *               comment:
 *                 type: string
 *                 description: Review comments.
 *     responses:
 *       201:
 *         description: Review submitted successfully.
 *       400:
 *         description: Bad request (invalid data).
 */
router.post('/', addReview);

/**
 * @swagger
 * /reviews/property/{propertyId}:
 *   get:
 *     summary: Get reviews for a property
 *     description: Retrieve all reviews related to a specific property.
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         description: The property ID.
 *     responses:
 *       200:
 *         description: List of reviews retrieved successfully.
 */
router.get('/property/:propertyId', getReviewsForProperty);

/**
 * @swagger
 * /reviews/tenant/{tenantId}:
 *   get:
 *     summary: Get reviews for a tenant
 *     description: Retrieve all reviews related to a specific tenant.
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: tenantId
 *         required: true
 *         schema:
 *           type: string
 *         description: The tenant ID.
 *     responses:
 *       200:
 *         description: List of reviews retrieved successfully.
 */
router.get('/tenant/:tenantId', getReviewsForTenant);

export default router;
