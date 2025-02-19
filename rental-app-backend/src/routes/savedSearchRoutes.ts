import express from 'express';
import {
  createSavedSearch,
  getSavedSearches,
  deleteSavedSearch,
  addFavorite,
  getFavorites,
  removeFavorite,
} from '../controllers/savedSearchController';
import protect from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Saved Searches & Favorites
 *   description: Endpoints for saving searches and managing favorite properties.
 */

/**
 * @swagger
 * /saved-searches:
 *   post:
 *     summary: Save a search query
 *     description: Allows users to save property search queries.
 *     tags: [Saved Searches & Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user saving the search.
 *               searchCriteria:
 *                 type: object
 *                 description: The search filters used by the user.
 *     responses:
 *       201:
 *         description: Search query saved successfully.
 *       400:
 *         description: Invalid request data.
 */
router.post('/', protect, createSavedSearch);

/**
 * @swagger
 * /saved-searches/{userId}:
 *   get:
 *     summary: Retrieve saved searches
 *     description: Fetch all saved searches for a specific user.
 *     tags: [Saved Searches & Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *     responses:
 *       200:
 *         description: List of saved searches.
 *       404:
 *         description: No saved searches found.
 */
router.get('/:userId', protect, getSavedSearches);

/**
 * @swagger
 * /saved-searches/{id}:
 *   delete:
 *     summary: Delete a saved search
 *     description: Remove a specific saved search by ID.
 *     tags: [Saved Searches & Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the saved search.
 *     responses:
 *       200:
 *         description: Saved search deleted successfully.
 *       404:
 *         description: Saved search not found.
 */
router.delete('/:id', protect, deleteSavedSearch);

/**
 * @swagger
 * /saved-searches/favorites:
 *   post:
 *     summary: Add property to favorites
 *     description: Allows users to add a property to their favorite list.
 *     tags: [Saved Searches & Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user adding the favorite.
 *               propertyId:
 *                 type: string
 *                 description: ID of the property to be added.
 *     responses:
 *       201:
 *         description: Property added to favorites.
 *       400:
 *         description: Invalid request data.
 */
router.post('/favorites', protect, addFavorite);

/**
 * @swagger
 * /saved-searches/favorites/{userId}:
 *   get:
 *     summary: Get favorite properties
 *     description: Fetch a user's list of favorite properties.
 *     tags: [Saved Searches & Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *     responses:
 *       200:
 *         description: List of favorite properties retrieved successfully.
 *       404:
 *         description: No favorite properties found.
 */
router.get('/favorites/:userId', protect, getFavorites);

/**
 * @swagger
 * /saved-searches/favorites:
 *   delete:
 *     summary: Remove property from favorites
 *     description: Allows users to remove a property from their favorites.
 *     tags: [Saved Searches & Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user removing the favorite.
 *               propertyId:
 *                 type: string
 *                 description: ID of the property to be removed.
 *     responses:
 *       200:
 *         description: Property removed from favorites.
 *       400:
 *         description: Invalid request data.
 */
router.delete('/favorites', protect, removeFavorite);

export default router;