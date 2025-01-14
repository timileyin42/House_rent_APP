import { Request, Response } from 'express';
import axios from 'axios';
import Payment from '../models/Payment';
import nodemailer from 'nodemailer';

// Load environment variables
require('dotenv').config();

// Initialize nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use 'gmail' for Gmail
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Initialize payment
export const initializePayment = async (req: Request, res: Response): Promise<void> => {
    const { amount, email } = req.body;

    try {
        const response = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            {
                email,
                amount,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
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
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            },
        });

        const paymentData = response.data.data;

        // Check the payment status
        if (paymentData.status === 'success') {
            // Handle successful payment
            const { email, amount } = paymentData;

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

                // Notify the user about the successful payment
                await transporter.sendMail({
                    from: process.env.EMAIL_USER, // Sender address
                    to: email, // Recipient's email address
                    subject: 'Payment Successful',
                    text: `Your payment of ${amount / 100} NGN was successful! Thank you for your payment.`,
                });
            }
        } else if (paymentData.status === 'abandoned') {
            // Handle abandoned payment
            console.log('Payment was abandoned:', paymentData);
            // Optionally, log this information or notify the user
        } else {
            // Handle failed payment
            console.log('Payment failed:', paymentData);
            // Optionally, notify the user about the failure
            await transporter.sendMail({
                from: process.env.EMAIL_USER, // Sender address
                to: paymentData.customer.email, // Recipient's email address
                subject: 'Payment Failed',
                text: `Your payment of ${paymentData.amount / 100} NGN failed. Please try again.`,
            });
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
