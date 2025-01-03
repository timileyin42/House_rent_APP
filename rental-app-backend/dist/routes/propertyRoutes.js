"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const propertyController_1 = require("../controllers/propertyController");
const validation_1 = require("../middleware/validation");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware")); // Ensure user is authenticated
const roleMiddleware_1 = require("../middleware/roleMiddleware"); // Role-based access control
const router = (0, express_1.Router)();
// Search for properties (open to all)
router.get('/search', propertyController_1.searchProperties);
// Get property by ID (open to all)
router.get('/:id', propertyController_1.getPropertyById);
// Create a new property (restricted to landlords)
router.post('/', authMiddleware_1.default, roleMiddleware_1.landlordOnly, validation_1.validateProperty, propertyController_1.createProperty);
// Update property by ID (restricted to landlords)
router.put('/:id', authMiddleware_1.default, roleMiddleware_1.landlordOnly, propertyController_1.updatePropertyById);
// Delete property by ID (restricted to landlords)
router.delete('/:id', authMiddleware_1.default, roleMiddleware_1.landlordOnly, propertyController_1.deletePropertyById);
exports.default = router;
