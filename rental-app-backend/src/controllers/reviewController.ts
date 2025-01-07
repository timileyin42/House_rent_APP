import { Request, Response } from 'express';
import Review, { IReview } from '../models/Review'; // Import IReview

// Add a review
export const addReview = async (req: Request, res: Response): Promise<void> => {
    const { propertyId, tenantId, landlordId, rating, comment, reviewedEntity } = req.body;

    try {
        const reviewData: Partial<IReview> = {
            landlordId,
            rating,
            comment,
            reviewedEntity,
        };

        // Conditionally add propertyId or tenantId
        if (reviewedEntity === 'property') {
            reviewData.propertyId = propertyId;
        } else if (reviewedEntity === 'tenant') {
            reviewData.tenantId = tenantId;
        }

        const review = new Review(reviewData);
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({
            message: 'Error adding review',
            error: (error as Error).message,
        });
    }
};

// Get reviews for a specific property
export const getReviewsForProperty = async (req: Request, res: Response): Promise<void> => {
    const { propertyId } = req.params;

    try {
        const reviews = await Review.find({ propertyId, reviewedEntity: 'property' })
            .populate('tenantId', 'name email') // Populate tenant details
            .populate('landlordId', 'name email'); // Populate landlord details
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({
            message: 'Error fetching reviews',
            error: (error as Error).message,
        });
    }
};

// Get reviews for a specific tenant
export const getReviewsForTenant = async (req: Request, res: Response): Promise<void> => {
    const { tenantId } = req.params;

    try {
        const reviews = await Review.find({ tenantId, reviewedEntity: 'tenant' })
            .populate('landlordId', 'name email'); // Populate landlord details
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching tenant reviews:', error);
        res.status(500).json({
            message: 'Error fetching tenant reviews',
            error: (error as Error).message,
        });
    }
};

