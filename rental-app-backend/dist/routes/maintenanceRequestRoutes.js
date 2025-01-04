"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const maintenanceRequestController_1 = require("../controllers/maintenanceRequestController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
// Create a maintenance request
router.post('/', authMiddleware_1.default, maintenanceRequestController_1.createMaintenanceRequest);
// Get maintenance requests (tenant or landlord based on role)
router.get('/', authMiddleware_1.default, maintenanceRequestController_1.getMaintenanceRequests);
// Update the status of a maintenance request
router.patch('/status', authMiddleware_1.default, maintenanceRequestController_1.updateMaintenanceRequestStatus);
// Delete a maintenance request
router.delete('/:requestId', authMiddleware_1.default, maintenanceRequestController_1.deleteMaintenanceRequest);
exports.default = router;
