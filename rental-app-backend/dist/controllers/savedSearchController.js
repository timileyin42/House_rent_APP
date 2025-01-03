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
exports.deleteSavedSearch = exports.getSavedSearches = exports.createSavedSearch = void 0;
const SavedSearch_1 = require("../models/SavedSearch");
// Controller for saving a search
const createSavedSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, criteria } = req.body;
        if (!userId || !criteria) {
            res.status(400).json({ message: 'User  ID and search criteria are required.' });
            return; // Explicitly return to ensure no further execution
        }
        const newSavedSearch = new SavedSearch_1.SavedSearch({ userId, criteria });
        const savedSearch = yield newSavedSearch.save();
        res.status(201).json({ message: 'Search saved successfully.', data: savedSearch });
    }
    catch (error) {
        console.error('Error saving search:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
});
exports.createSavedSearch = createSavedSearch;
// Controller for retrieving saved searches for a user
const getSavedSearches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            res.status(400).json({ message: 'User  ID is required.' });
            return; // Explicitly return to ensure no further execution
        }
        const savedSearches = yield SavedSearch_1.SavedSearch.find({ userId });
        res.status(200).json({ message: 'Saved searches retrieved successfully.', data: savedSearches });
    }
    catch (error) {
        console.error('Error retrieving saved searches:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
});
exports.getSavedSearches = getSavedSearches;
// Controller for deleting a saved search
const deleteSavedSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'Saved search ID is required.' });
            return; // Explicitly return to ensure no further execution
        }
        const deletedSearch = yield SavedSearch_1.SavedSearch.findByIdAndDelete(id);
        if (!deletedSearch) {
            res.status(404).json({ message: 'Saved search not found.' });
            return; // Explicitly return to ensure no further execution
        }
        res.status(200).json({ message: 'Saved search deleted successfully.' });
    }
    catch (error) {
        console.error('Error deleting saved search:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
});
exports.deleteSavedSearch = deleteSavedSearch;
