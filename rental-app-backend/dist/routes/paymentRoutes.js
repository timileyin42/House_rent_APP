"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/paymentRoutes.ts
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const router = (0, express_1.Router)();
// Initialize payment
router.post('/initialize', paymentController_1.initializePayment);
// Webhook for Paystack to send payment status
router.post('/webhook', paymentController_1.paymentWebhook);
// Callback to verify payment status
router.get('/verify/:reference', paymentController_1.verifyPayment);
exports.default = router; // This line is correct for default export
