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

// Route to create a new saved search
router.post('/', protect, createSavedSearch);

// Route to get all saved searches for a user
router.get('/:userId', protect, getSavedSearches);

// Route to delete a saved search by ID
router.delete('/:id', protect, deleteSavedSearch);

// Route to add a property to favorites
router.post('/favorites', protect, addFavorite);

// Route to get favorite properties
router.get('/favorites/:userId', protect, getFavorites);

// Route to remove a property from favorites
router.delete('/favorites', protect, removeFavorite);

export default router;

