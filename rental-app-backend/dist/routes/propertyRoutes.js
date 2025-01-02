"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const propertyController_1 = require("../controllers/propertyController"); // Import the controller functions
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// Create a new property
router.post('/', validation_1.validateProperty, propertyController_1.createProperty);
// Get property by ID
router.get('/:id', propertyController_1.getPropertyById);
// Update property by ID
router.put('/:id', propertyController_1.updatePropertyById);
// Delete property by ID
router.delete('/:id', propertyController_1.deletePropertyById);
exports.default = router; // Ensure this is a default export
