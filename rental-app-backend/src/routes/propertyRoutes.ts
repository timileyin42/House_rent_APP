import { Router, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';
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
import protect from '../middleware/authMiddleware';
import { landlordOnly } from '../middleware/roleMiddleware';
import { AuthRequest } from '../types/AuthRequest';

dotenv.config();

const router = Router();
const GEOCODING_API_URL = process.env.GEOCODING_API_URL;
const GEOCODING_API_KEY = process.env.GEOCODING_API_KEY;

// Validate environment variables
if (!GEOCODING_API_URL || !GEOCODING_API_KEY) {
  throw new Error('Geocoding API URL or API key is missing in environment variables.');
}

/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Endpoints for property management and analytics.
 */

/**
 * @swagger
 * /properties/search:
 *   get:
 *     summary: Search for properties
 *     description: Retrieve properties based on filters like location, price, and features.
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter properties by location.
 *       - in: query
 *         name: price_min
 *         schema:
 *           type: number
 *         description: Minimum price filter.
 *       - in: query
 *         name: price_max
 *         schema:
 *           type: number
 *         description: Maximum price filter.
 *     responses:
 *       200:
 *         description: Properties found.
 */
router.get('/search', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { location } = req.query;
    let latitude, longitude;

    if (location) {
      const geoResponse = await axios.get(GEOCODING_API_URL, {
        params: { address: location, key: GEOCODING_API_KEY },
      });

      if (geoResponse.data.results.length === 0) {
        res.status(400).json({ message: 'Invalid location provided.' });
        return;
      }

      latitude = geoResponse.data.results[0].geometry.location.lat;
      longitude = geoResponse.data.results[0].geometry.location.lng;
    }

    req.query.latitude = latitude;
    req.query.longitude = longitude;

    // Call the controller function without passing `next`
    await searchProperties(req, res);
  } catch (error) {
    next(error); // Pass errors to the error-handling middleware
  }
});

/**
 * @swagger
 * /properties/{id}:
 *   get:
 *     summary: Get property details
 *     description: Retrieve details of a specific property by ID.
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The property ID.
 *     responses:
 *       200:
 *         description: Property details retrieved successfully.
 */
router.get('/:id', getPropertyById);

/**
 * @swagger
 * /properties/{id}/view:
 *   post:
 *     summary: Track property views
 *     description: Log a view for a specific property.
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The property ID.
 *     responses:
 *       200:
 *         description: Property view recorded.
 */
router.post('/:id/view', trackPropertyView);

/**
 * @swagger
 * /properties/{id}/inquiry:
 *   post:
 *     summary: Track property inquiries
 *     description: Log an inquiry for a specific property.
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The property ID.
 *     responses:
 *       200:
 *         description: Inquiry recorded successfully.
 */
router.post('/:id/inquiry', trackPropertyInquiry);

/**
 * @swagger
 * /properties/{id}/analytics:
 *   get:
 *     summary: Get property analytics
 *     description: Retrieve analytics such as number of views and inquiries (landlord-only).
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The property ID.
 *     responses:
 *       200:
 *         description: Property analytics retrieved.
 *       403:
 *         description: Access forbidden (only landlords allowed).
 */
router.get('/:id/analytics', protect, landlordOnly, getPropertyAnalytics);

/**
 * @swagger
 * /properties:
 *   post:
 *     summary: Create a new property
 *     description: Add a new property (landlord-only).
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Property title.
 *               location:
 *                 type: string
 *                 description: Property location.
 *               price:
 *                 type: number
 *                 description: Rental price.
 *               description:
 *                 type: string
 *                 description: Property description.
 *     responses:
 *       201:
 *         description: Property created successfully.
 *       403:
 *         description: Access forbidden (only landlords allowed).
 */
router.post('/', protect, landlordOnly, validateProperty, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { location } = req.body;
    const geoResponse = await axios.get(GEOCODING_API_URL, {
      params: { address: location, key: GEOCODING_API_KEY },
    });

    if (geoResponse.data.results.length === 0) {
      res.status(400).json({ message: 'Invalid location provided.' });
      return;
    }

    req.body.latitude = geoResponse.data.results[0].geometry.location.lat;
    req.body.longitude = geoResponse.data.results[0].geometry.location.lng;

    // Call the controller function without passing `next`
    await createProperty(req, res);
  } catch (error) {
    next(error); // Pass errors to the error-handling middleware
  }
});

/**
 * @swagger
 * /properties/{id}:
 *   put:
 *     summary: Update property details
 *     description: Modify an existing property (landlord-only).
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The property ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               location:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Property updated successfully.
 *       403:
 *         description: Access forbidden (only landlords allowed).
 */
router.put('/:id', protect, landlordOnly, updatePropertyById);

/**
 * @swagger
 * /properties/{id}:
 *   delete:
 *     summary: Delete a property
 *     description: Remove an existing property (landlord-only).
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The property ID.
 *     responses:
 *       200:
 *         description: Property deleted successfully.
 *       403:
 *         description: Access forbidden (only landlords allowed).
 */
router.delete('/:id', protect, landlordOnly, deletePropertyById);

export default router;