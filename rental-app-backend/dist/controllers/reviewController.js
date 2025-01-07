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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewsForProperty = exports.addReview = void 0;
const Review_1 = __importDefault(require("../models/Review"));
// Add a review
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { propertyId, tenantId, landlordId, rating, comment } = req.body;
    try {
        const review = new Review_1.default({
            propertyId,
            tenantId,
            landlordId,
            rating,
            comment,
        });
        yield review.save();
        res.status(201).json(review);
    }
    catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({
            message: 'Error adding review',
            error: error.message, // Assert the error as type 'Error'
        });
    }
});
exports.addReview = addReview;
// Get reviews for a specific property
const getReviewsForProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { propertyId } = req.params;
    try {
        const reviews = yield Review_1.default.find({ propertyId })
            .populate('tenantId', 'name email') // Populates tenant details from 'User'
            .populate('landlordId', 'name email'); // Populates landlord details from 'User'
        res.status(200).json(reviews);
    }
    catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({
            message: 'Error fetching reviews',
            error: error.message, // Assert the error as type 'Error'
        });
    }
});
exports.getReviewsForProperty = getReviewsForProperty;
