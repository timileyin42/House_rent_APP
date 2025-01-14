import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
    propertyId?: mongoose.Types.ObjectId; // Reference to the property being reviewed (optional for tenant reviews)
    tenantId?: mongoose.Types.ObjectId; // Reference to the tenant being reviewed (optional for property reviews)
    landlordId: mongoose.Types.ObjectId; // Landlord creating the review
    rating: number; // Rating out of 5
    comment: string; // Review comment
    reviewedEntity: 'property' | 'tenant'; // Entity being reviewed
    createdAt: Date; // Timestamp
}

const ReviewSchema: Schema = new Schema({
    propertyId: { type: mongoose.Types.ObjectId, ref: 'Property' },
    tenantId: { type: mongoose.Types.ObjectId, ref: 'User' }, // Tenant reviews will reference 'User' model
    landlordId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1 and 5
    comment: { type: String, required: true },
    reviewedEntity: {
        type: String,
        enum: ['property', 'tenant'],
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model<IReview>('Review', ReviewSchema);
export default Review;

