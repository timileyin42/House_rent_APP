import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
    propertyId: mongoose.Types.ObjectId; // Reference to the property being reviewed
    tenantId: mongoose.Types.ObjectId; // Reference to the tenant who wrote the review
    landlordId: mongoose.Types.ObjectId; // Reference to the landlord being reviewed (if applicable)
    rating: number; // Rating out of 5
    comment: string; // Review comment
    createdAt: Date; // Timestamp
}

const ReviewSchema: Schema = new Schema({
    propertyId: { type: mongoose.Types.ObjectId, required: true, ref: 'Property' },
    tenantId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }, // Changed to 'User'
    landlordId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }, // Changed to 'User'
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1 and 5
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model<IReview>('Review', ReviewSchema);
export default Review;

