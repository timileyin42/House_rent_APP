// src/controllers/paymentController.ts
import { Request, Response } from 'express';
import axios from 'axios';
import Payment from '../models/Payment';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// Initialize payment
export const initializePayment = async (req: Request, res: Response): Promise<void> => {
    const { amount, email } = req.body; // Amount should be in kobo (1 Naira = 100 Kobo)

    try {
        const response = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            {
                email,
                amount,
            },
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Send the authorization URL and reference back to the client
        res.status(200).json({
            status: true,
            message: "Authorization URL created",
            data: {
                authorization_url: response.data.data.authorization_url,
                reference: response.data.data.reference,
            },
        });
    } catch (error) {
        console.error('Error initializing payment:', error);
        res.status(500).json({
            message: 'Payment initialization failed',
            error: error instanceof Error ? error.message : error,
        });
    }
};

// Webhook for payment status
export const paymentWebhook = async (req: Request, res: Response): Promise<void> => {
    const event = req.body;

    // Verify the event
    if (event.event === 'charge.success') {
        const { email, amount, reference } = event.data;

        // Save payment details to the database
        try {
            const payment = new Payment({
                email,
                amount,
                status: 'success',
                reference,
            });
            await payment.save();
            console.log('Payment recorded:', payment);
        } catch (error) {
            console.error('Error saving payment:', error);
        }
    }

    res.status(200).send('Webhook received');
};

// Callback for handling payment verification
export const verifyPayment = async (req: Request, res: Response): Promise<void> => {
    const { reference } = req.params; // Get the payment reference from the URL

    try {
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            },
        });

        // Check if the payment is successful
        if (response.data.data.status === 'success') {
            const { email, amount } = response.data.data;

            // Check if the payment already exists
            const existingPayment = await Payment.findOne({ reference });
            if (!existingPayment) {
                const payment = new Payment({
                    email,
                    amount,
                    status: 'success',
                    reference,
                });
                await payment.save();
                console.log('Payment recorded:', payment);
            }
        }

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({
            message: 'Payment verification failed',
            error: error instanceof Error ? error.message : error,
        });
    }
};
