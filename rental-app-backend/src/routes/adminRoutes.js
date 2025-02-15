"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var adminController_1 = require("../controllers/adminController");
var router = (0, express_1.Router)();
// Get all pending properties
router.get('/properties/pending', adminController_1.getPendingProperties);
// Approve a property
router.post('/properties/:id/approve', adminController_1.approveProperty);
// Reject a property
router.post('/properties/:id/reject', adminController_1.rejectProperty);
// Get user activities
router.get('/users/activities', adminController_1.getUserActivities); // New route for user activities
exports.default = router;
