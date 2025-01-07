"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewController_1 = require("../controllers/reviewController");
const router = (0, express_1.Router)();
// Add a review
router.post('/', reviewController_1.addReview);
// Get reviews for a specific property
router.get('/property/:propertyId', reviewController_1.getReviewsForProperty);
// Get reviews for a specific tenant
router.get('/tenant/:tenantId', reviewController_1.getReviewsForTenant);
exports.default = router;
