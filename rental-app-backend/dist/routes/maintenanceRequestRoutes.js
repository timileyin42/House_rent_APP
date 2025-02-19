"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const maintenanceRequestController_1 = require("../controllers/maintenanceRequestController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Maintenance Requests
 *   description: Endpoints for managing maintenance requests.
 */
/**
 * @swagger
 * /maintenance:
 *   post:
 *     summary: Create a maintenance request
 *     description: Allows a tenant to submit a maintenance request.
 *     tags: [Maintenance Requests]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               propertyId:
 *                 type: string
 *                 description: ID of the property requiring maintenance.
 *               description:
 *                 type: string
 *                 description: Details of the maintenance issue.
 *     responses:
 *       201:
 *         description: Maintenance request successfully created.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Unauthorized access.
 */
router.post('/', authMiddleware_1.default, maintenanceRequestController_1.createMaintenanceRequest);
/**
 * @swagger
 * /maintenance:
 *   get:
 *     summary: Get maintenance requests
 *     description: Fetches maintenance requests for a tenant or landlord.
 *     tags: [Maintenance Requests]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of maintenance requests.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   propertyId:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum: [pending, in-progress, completed]
 *       401:
 *         description: Unauthorized access.
 */
router.get('/', authMiddleware_1.default, maintenanceRequestController_1.getMaintenanceRequests);
/**
 * @swagger
 * /maintenance/status:
 *   patch:
 *     summary: Update maintenance request status
 *     description: Allows landlords to update the status of a maintenance request.
 *     tags: [Maintenance Requests]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               requestId:
 *                 type: string
 *                 description: ID of the maintenance request.
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *                 description: New status of the request.
 *     responses:
 *       200:
 *         description: Maintenance request status updated successfully.
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Unauthorized access.
 */
router.patch('/status', authMiddleware_1.default, maintenanceRequestController_1.updateMaintenanceRequestStatus);
/**
 * @swagger
 * /maintenance/{requestId}:
 *   delete:
 *     summary: Delete a maintenance request
 *     description: Allows a landlord or tenant to delete a maintenance request.
 *     tags: [Maintenance Requests]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         description: ID of the maintenance request to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Maintenance request deleted successfully.
 *       404:
 *         description: Maintenance request not found.
 *       401:
 *         description: Unauthorized access.
 */
router.delete('/:requestId', authMiddleware_1.default, maintenanceRequestController_1.deleteMaintenanceRequest);
exports.default = router;
