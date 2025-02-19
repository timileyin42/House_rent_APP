"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management for properties and users
 */
/**
 * @swagger
 * /api/admin/properties/pending:
 *   get:
 *     summary: Get all pending properties
 *     description: Retrieves a list of properties that are pending approval.
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of pending properties.
 *       500:
 *         description: Internal server error.
 */
router.get('/properties/pending', adminController_1.getPendingProperties);
/**
 * @swagger
 * /api/admin/properties/{id}/approve:
 *   post:
 *     summary: Approve a property
 *     description: Marks a pending property as approved.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID to be approved.
 *     responses:
 *       200:
 *         description: Property approved successfully.
 *       404:
 *         description: Property not found.
 *       500:
 *         description: Internal server error.
 */
router.post('/properties/:id/approve', adminController_1.approveProperty);
/**
 * @swagger
 * /api/admin/properties/{id}/reject:
 *   post:
 *     summary: Reject a property
 *     description: Marks a pending property as rejected.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID to be rejected.
 *     responses:
 *       200:
 *         description: Property rejected successfully.
 *       404:
 *         description: Property not found.
 *       500:
 *         description: Internal server error.
 */
router.post('/properties/:id/reject', adminController_1.rejectProperty);
/**
 * @swagger
 * /api/admin/users/activities:
 *   get:
 *     summary: Get user activities
 *     description: Retrieves a list of user activities.
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of user activities.
 *       500:
 *         description: Internal server error.
 */
router.get('/users/activities', adminController_1.getUserActivities);
exports.default = router;
