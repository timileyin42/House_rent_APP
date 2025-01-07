import { Request, Response } from 'express';
import Review from '../models/Review';

// Add a review
export const addReview = async (req: Request, res: Response): Promise<void> => {
    const { propertyId, tenantId, landlordId, rating, comment } = req.body;

    try {
        const review = new Review({
            propertyId,
            tenantId,
            landlordId,
            rating,
            comment,
        });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({
            message: 'Error adding review',
            error: (error as Error).message, // Assert the error as type 'Error'
        });
    }
};

// Get reviews for a specific property
export const getReviewsForProperty = async (req: Request, res: Response): Promise<void> => {
    const { propertyId } = req.params;

    try {
        const reviews = await Review.find({ propertyId })
            .populate('tenantId', 'name email') // Populates tenant details from 'User'
            .populate('landlordId', 'name email'); // Populates landlord details from 'User'
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({
            message: 'Error fetching reviews',
            error: (error as Error).message, // Assert the error as type 'Error'
        });
    }
};

