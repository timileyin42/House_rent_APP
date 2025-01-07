// src/controllers/paymentController.ts
import { Request, Response } from 'express';
import axios from 'axios';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

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

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error initializing payment:', error);
        res.status(500).json({
            message: 'Payment initialization failed',
            error: error instanceof Error ? error.message : error,
        });
    }
};
