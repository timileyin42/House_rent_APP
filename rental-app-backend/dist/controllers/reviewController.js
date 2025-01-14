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
exports.getReviewsForTenant = exports.getReviewsForProperty = exports.addReview = void 0;
const Review_1 = __importDefault(require("../models/Review")); // Import IReview
// Add a review
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { propertyId, tenantId, landlordId, rating, comment, reviewedEntity } = req.body;
    try {
        const reviewData = {
            landlordId,
            rating,
            comment,
            reviewedEntity,
        };
        // Conditionally add propertyId or tenantId
        if (reviewedEntity === 'property') {
            reviewData.propertyId = propertyId;
        }
        else if (reviewedEntity === 'tenant') {
            reviewData.tenantId = tenantId;
        }
        const review = new Review_1.default(reviewData);
        yield review.save();
        res.status(201).json(review);
    }
    catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({
            message: 'Error adding review',
            error: error.message,
        });
    }
});
exports.addReview = addReview;
// Get reviews for a specific property
const getReviewsForProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { propertyId } = req.params;
    try {
        const reviews = yield Review_1.default.find({ propertyId, reviewedEntity: 'property' })
            .populate('tenantId', 'name email') // Populate tenant details
            .populate('landlordId', 'name email'); // Populate landlord details
        res.status(200).json(reviews);
    }
    catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({
            message: 'Error fetching reviews',
            error: error.message,
        });
    }
});
exports.getReviewsForProperty = getReviewsForProperty;
// Get reviews for a specific tenant
const getReviewsForTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenantId } = req.params;
    try {
        const reviews = yield Review_1.default.find({ tenantId, reviewedEntity: 'tenant' })
            .populate('landlordId', 'name email'); // Populate landlord details
        res.status(200).json(reviews);
    }
    catch (error) {
        console.error('Error fetching tenant reviews:', error);
        res.status(500).json({
            message: 'Error fetching tenant reviews',
            error: error.message,
        });
    }
});
exports.getReviewsForTenant = getReviewsForTenant;
