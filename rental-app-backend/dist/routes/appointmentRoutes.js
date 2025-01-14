"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointmentController_1 = require("../controllers/appointmentController");
const router = express_1.default.Router();
// Schedule an appointment
router.post('/schedule', appointmentController_1.scheduleAppointment);
// Get appointments for a specific property
router.get('/:propertyId', appointmentController_1.getAppointmentsForProperty);
exports.default = router;
