// src/routes/paymentRoutes.ts
import { Router } from 'express';
import { initializePayment, paymentWebhook, verifyPayment } from '../controllers/paymentController';

const router = Router();

// Initialize payment
router.post('/initialize', initializePayment);

// Webhook for Paystack to send payment status
router.post('/webhook', paymentWebhook);

// Callback to verify payment status
router.get('/verify/:reference', verifyPayment);

export default router;
