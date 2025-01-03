import { Request, Response } from 'express';
import { SavedSearch } from '../models/SavedSearch';

// Controller for saving a search
export const createSavedSearch = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, criteria } = req.body;

        if (!userId || !criteria) {
            res.status(400).json({ message: 'User  ID and search criteria are required.' });
            return; // Explicitly return to ensure no further execution
        }

        const newSavedSearch = new SavedSearch({ userId, criteria });
        const savedSearch = await newSavedSearch.save();

        res.status(201).json({ message: 'Search saved successfully.', data: savedSearch });
    } catch (error: unknown) {
        console.error('Error saving search:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
};

// Controller for retrieving saved searches for a user
export const getSavedSearches = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        if (!userId) {
            res.status(400).json({ message: 'User  ID is required.' });
            return; // Explicitly return to ensure no further execution
        }

        const savedSearches = await SavedSearch.find({ userId });

        res.status(200).json({ message: 'Saved searches retrieved successfully.', data: savedSearches });
    } catch (error: unknown) {
        console.error('Error retrieving saved searches:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
};

// Controller for deleting a saved search
export const deleteSavedSearch = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: 'Saved search ID is required.' });
            return; // Explicitly return to ensure no further execution
        }

        const deletedSearch = await SavedSearch.findByIdAndDelete(id);

        if (!deletedSearch) {
            res.status(404).json({ message: 'Saved search not found.' });
            return; // Explicitly return to ensure no further execution
        }

        res.status(200).json({ message: 'Saved search deleted successfully.' });
    } catch (error: unknown) {
        console.error('Error deleting saved search:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
};
