"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavorite = exports.getFavorites = exports.addFavorite = exports.deleteSavedSearch = exports.getSavedSearches = exports.createSavedSearch = void 0;
const SavedSearch_1 = require("../models/SavedSearch");
// Controller for saving a search
const createSavedSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, criteria } = req.body;
        if (!userId || !criteria) {
            res.status(400).json({ message: 'User ID and search criteria are required.' });
            return;
        }
        const newSavedSearch = new SavedSearch_1.SavedSearch({ userId, criteria });
        const savedSearch = yield newSavedSearch.save();
        res.status(201).json({ message: 'Search saved successfully.', data: savedSearch });
    }
    catch (error) {
        console.error('Error saving search:', error);
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.createSavedSearch = createSavedSearch;
// Controller for retrieving saved searches for a user
const getSavedSearches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            res.status(400).json({ message: 'User ID is required.' });
            return;
        }
        const savedSearches = yield SavedSearch_1.SavedSearch.find({ userId });
        res.status(200).json({ message: 'Saved searches retrieved successfully.', data: savedSearches });
    }
    catch (error) {
        console.error('Error retrieving saved searches:', error);
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getSavedSearches = getSavedSearches;
// Controller for deleting a saved search
const deleteSavedSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'Saved search ID is required.' });
            return;
        }
        const deletedSearch = yield SavedSearch_1.SavedSearch.findByIdAndDelete(id);
        if (!deletedSearch) {
            res.status(404).json({ message: 'Saved search not found.' });
            return;
        }
        res.status(200).json({ message: 'Saved search deleted successfully.' });
    }
    catch (error) {
        console.error('Error deleting saved search:', error);
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.deleteSavedSearch = deleteSavedSearch;
// Add a property to favorites
const addFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, propertyId } = req.body;
        if (!userId || !propertyId) {
            res.status(400).json({ message: 'User ID and property ID are required.' });
            return;
        }
        const savedSearch = yield SavedSearch_1.SavedSearch.findOne({ userId });
        if (!savedSearch) {
            res.status(404).json({ message: 'Saved search not found for this user.' });
            return;
        }
        if (savedSearch.favorites.includes(propertyId)) {
            res.status(400).json({ message: 'Property is already in favorites.' });
            return;
        }
        savedSearch.favorites.push(propertyId);
        yield savedSearch.save();
        res.status(200).json({ message: 'Property added to favorites.', data: savedSearch.favorites });
    }
    catch (error) {
        console.error('Error adding favorite:', error);
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.addFavorite = addFavorite;
// Retrieve favorite properties
const getFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            res.status(400).json({ message: 'User ID is required.' });
            return;
        }
        const savedSearch = yield SavedSearch_1.SavedSearch.findOne({ userId }).populate('favorites');
        if (!savedSearch) {
            res.status(404).json({ message: 'Saved search not found for this user.' });
            return;
        }
        res.status(200).json({ message: 'Favorite properties retrieved successfully.', data: savedSearch.favorites });
    }
    catch (error) {
        console.error('Error retrieving favorites:', error);
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getFavorites = getFavorites;
// Remove a property from favorites
const removeFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, propertyId } = req.body;
        if (!userId || !propertyId) {
            res.status(400).json({ message: 'User ID and property ID are required.' });
            return;
        }
        const savedSearch = yield SavedSearch_1.SavedSearch.findOne({ userId });
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
        yield savedSearch.save();
        res.status(200).json({ message: 'Property removed from favorites.', data: savedSearch.favorites });
    }
    catch (error) {
        console.error('Error removing favorite:', error);
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.removeFavorite = removeFavorite;
