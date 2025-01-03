import express from 'express';
import {
    createSavedSearch,
    getSavedSearches,
    deleteSavedSearch
} from '../controllers/savedSearchController';
import protect from '../middleware/authMiddleware';

const router = express.Router();

// Route to create a new saved search
router.post('/', protect, createSavedSearch);

// Route to get all saved searches for a user
router.get('/:userId', protect, getSavedSearches);

// Route to delete a saved search by ID
router.delete('/:id', protect, deleteSavedSearch);

export default router;

