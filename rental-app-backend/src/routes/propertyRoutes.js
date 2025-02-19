"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var propertyController_1 = require("../controllers/propertyController");
var validation_1 = require("../middleware/validation");
var authMiddleware_1 = require("../middleware/authMiddleware"); // Ensure user is authenticated
var roleMiddleware_1 = require("../middleware/roleMiddleware"); // Role-based access control
var router = (0, express_1.Router)();
// Search for properties (open to all)
router.get('/search', propertyController_1.searchProperties); // Ensure searchProperties is correctly defined
// Get property by ID (open to all)
router.get('/:id', propertyController_1.getPropertyById); // Ensure getPropertyById is correctly defined
// Track property view (open to all)
router.post('/:id/view', propertyController_1.trackPropertyView); // Ensure trackPropertyView is correctly defined
// Track property inquiry (open to all)
router.post('/:id/inquiry', propertyController_1.trackPropertyInquiry); // Ensure trackPropertyInquiry is correctly defined
// Get property analytics (restricted to landlords)
router.get('/:id/analytics', authMiddleware_1.default, roleMiddleware_1.landlordOnly, propertyController_1.getPropertyAnalytics); // Ensure getPropertyAnalytics is correctly defined
// Create a new property (restricted to landlords)
router.post('/', authMiddleware_1.default, roleMiddleware_1.landlordOnly, validation_1.validateProperty, propertyController_1.createProperty); // Ensure createProperty is correctly defined
// Update property by ID (restricted to landlords)
router.put('/:id', authMiddleware_1.default, roleMiddleware_1.landlordOnly, propertyController_1.updatePropertyById); // Ensure updatePropertyById is correctly defined
// Delete property by ID (restricted to landlords)
router.delete('/:id', authMiddleware_1.default, roleMiddleware_1.landlordOnly, propertyController_1.deletePropertyById); // Ensure deletePropertyById is correctly defined
exports.default = router;
