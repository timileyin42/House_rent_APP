// src/models/Payment.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
    email: string;
    amount: number;
    status: string;
    reference: string;
    createdAt: Date;
}

const PaymentSchema: Schema = new Schema({
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    reference: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);
export default Payment;
