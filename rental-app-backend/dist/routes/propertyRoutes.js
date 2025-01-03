"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const propertyController_1 = require("../controllers/propertyController");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// Search for properties
router.get('/search', propertyController_1.searchProperties);
// Get property by ID
router.get('/:id', propertyController_1.getPropertyById);
// Create a new property
router.post('/', validation_1.validateProperty, propertyController_1.createProperty);
// Update property by ID
router.put('/:id', propertyController_1.updatePropertyById);
// Delete property by ID
router.delete('/:id', propertyController_1.deletePropertyById);
exports.default = router;
