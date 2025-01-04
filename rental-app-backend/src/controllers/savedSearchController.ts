import { Request, Response } from 'express';
import { SavedSearch } from '../models/SavedSearch';

// Controller for saving a search
export const createSavedSearch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, criteria } = req.body;

    if (!userId || !criteria) {
      res.status(400).json({ message: 'User ID and search criteria are required.' });
      return;
    }

    const newSavedSearch = new SavedSearch({ userId, criteria });
    const savedSearch = await newSavedSearch.save();

    res.status(201).json({ message: 'Search saved successfully.', data: savedSearch });
  } catch (error) {
    console.error('Error saving search:', error);
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Controller for retrieving saved searches for a user
export const getSavedSearches = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ message: 'User ID is required.' });
      return;
    }

    const savedSearches = await SavedSearch.find({ userId });

    res.status(200).json({ message: 'Saved searches retrieved successfully.', data: savedSearches });
  } catch (error) {
    console.error('Error retrieving saved searches:', error);
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Controller for deleting a saved search
export const deleteSavedSearch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: 'Saved search ID is required.' });
      return;
    }

    const deletedSearch = await SavedSearch.findByIdAndDelete(id);

    if (!deletedSearch) {
      res.status(404).json({ message: 'Saved search not found.' });
      return;
    }

    res.status(200).json({ message: 'Saved search deleted successfully.' });
  } catch (error) {
    console.error('Error deleting saved search:', error);
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Add a property to favorites
export const addFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, propertyId } = req.body;

    if (!userId || !propertyId) {
      res.status(400).json({ message: 'User ID and property ID are required.' });
      return;
    }

    const savedSearch = await SavedSearch.findOne({ userId });

    if (!savedSearch) {
      res.status(404).json({ message: 'Saved search not found for this user.' });
      return;
    }

    if (savedSearch.favorites.includes(propertyId)) {
      res.status(400).json({ message: 'Property is already in favorites.' });
      return;
    }

    savedSearch.favorites.push(propertyId);
    await savedSearch.save();

    res.status(200).json({ message: 'Property added to favorites.', data: savedSearch.favorites });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Retrieve favorite properties
export const getFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ message: 'User ID is required.' });
      return;
    }

    const savedSearch = await SavedSearch.findOne({ userId }).populate('favorites');

    if (!savedSearch) {
      res.status(404).json({ message: 'Saved search not found for this user.' });
      return;
    }

    res.status(200).json({ message: 'Favorite properties retrieved successfully.', data: savedSearch.favorites });
  } catch (error) {
    console.error('Error retrieving favorites:', error);
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Remove a property from favorites
export const removeFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, propertyId } = req.body;

    if (!userId || !propertyId) {
      res.status(400).json({ message: 'User ID and property ID are required.' });
      return;
    }

    const savedSearch = await SavedSearch.findOne({ userId });

    if (!savedSearch) {
      res.status(404).json({ message: 'Saved search not found for this user.' });
      return;
    }

    const index = savedSearch.favorites.indexOf(propertyId);

    if (index === -1) {
      res.status(400).json({ message: 'Property is not in favorites.' });
      return;
    }

    savedSearch.favorites.splice(index, 1);
    await savedSearch.save();

    res.status(200).json({ message: 'Property removed from favorites.', data: savedSearch.favorites });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : error,
    });
  }
};

