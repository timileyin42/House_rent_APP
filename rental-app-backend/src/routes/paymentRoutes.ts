import { Router } from 'express';
import { initializePayment, paymentWebhook, verifyPayment } from '../controllers/paymentController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Endpoints for handling payments.
 */

/**
 * @swagger
 * /payments/initialize:
 *   post:
 *     summary: Initialize a payment
 *     description: Creates a payment session and returns a reference for the transaction.
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Amount to be paid in the smallest currency unit.
 *               email:
 *                 type: string
 *                 description: Payer's email address.
 *               currency:
 *                 type: string
 *                 example: "NGN"
 *                 description: Currency code (default is NGN).
 *     responses:
 *       200:
 *         description: Payment session initialized successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Payment initialized"
 *                 data:
 *                   type: object
 *                   properties:
 *                     reference:
 *                       type: string
 *                       example: "abc123xyz"
 *                     authorization_url:
 *                       type: string
 *                       example: "https://paystack.com/pay/abc123xyz"
 *       400:
 *         description: Invalid request data.
 */
router.post('/initialize', initializePayment);

/**
 * @swagger
 * /payments/webhook:
 *   post:
 *     summary: Handle payment webhook
 *     description: Webhook for Paystack to send payment status updates.
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Webhook processed successfully.
 *       400:
 *         description: Invalid webhook request.
 */
router.post('/webhook', paymentWebhook);

/**
 * @swagger
 * /payments/verify/{reference}:
 *   get:
 *     summary: Verify a payment
 *     description: Checks the status of a payment using the transaction reference.
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: reference
 *         required: true
 *         description: Transaction reference ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment verification successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Transaction verified"
 *                 data:
 *                   type: object
 *                   properties:
 *                     reference:
 *                       type: string
 *                       example: "abc123xyz"
 *                     status:
 *                       type: string
 *                       example: "success"
 *                     amount:
 *                       type: number
 *                       example: 5000
 *       404:
 *         description: Transaction not found.
 */
router.get('/verify/:reference', verifyPayment);

export default router;
