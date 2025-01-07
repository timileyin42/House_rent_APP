"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.paymentWebhook = exports.initializePayment = void 0;
const axios_1 = __importDefault(require("axios"));
const Payment_1 = __importDefault(require("../models/Payment"));
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
// Initialize payment
const initializePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, email } = req.body; // Amount should be in kobo (1 Naira = 100 Kobo)
    try {
        const response = yield axios_1.default.post('https://api.paystack.co/transaction/initialize', {
            email,
            amount,
        }, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        res.status(200).json(response.data);
    }
    catch (error) {
        console.error('Error initializing payment:', error);
        res.status(500).json({
            message: 'Payment initialization failed',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.initializePayment = initializePayment;
// Webhook for payment status
const paymentWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = req.body;
    // Verify the event 
    if (event.event === 'charge.success') {
        const { email, amount, reference } = event.data;
        // Save payment details to the database
        try {
            const payment = new Payment_1.default({
                email,
                amount,
                status: 'success',
                reference,
            });
            yield payment.save();
            console.log('Payment recorded:', payment);
        }
        catch (error) {
            console.error('Error saving payment:', error);
        }
    }
    res.status(200).send('Webhook received');
});
exports.paymentWebhook = paymentWebhook;
// Callback for handling payment verification
const verifyPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reference } = req.params; // Get the payment reference from the URL
    try {
        const response = yield axios_1.default.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            },
        });
        // Check if the payment is successful
        if (response.data.data.status === 'success') {
            // Optionally, you can save the payment details to the database here as well
            const { email, amount } = response.data.data;
            // Check if the payment already exists
            const existingPayment = yield Payment_1.default.findOne({ reference });
            if (!existingPayment) {
                const payment = new Payment_1.default({
                    email,
                    amount,
                    status: 'success',
                    reference,
                });
                yield payment.save();
                console.log('Payment recorded:', payment);
            }
        }
        res.status(200).json(response.data);
    }
    catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({
            message: 'Payment verification failed',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.verifyPayment = verifyPayment;
