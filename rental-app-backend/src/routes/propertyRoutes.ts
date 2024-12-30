import { Router, Request, Response } from 'express';
import { Property } from '../models/Property';

const router = Router();

// Get property by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            res.status(404).json({ message: 'Property not found' });
            return;
        }
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : error,
        });
    }
});

// Update property by ID
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedProperty) {
            res.status(404).json({ message: 'Property not found' });
            return;
        }
        res.status(200).json(updatedProperty);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : error,
        });
    }
});

// Delete property by ID
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedProperty = await Property.findByIdAndDelete(req.params.id);
        if (!deletedProperty) {
            res.status(404).json({ message: 'Property not found' });
            return;
        }
        res.status(200).json({ message: 'Property deleted' });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : error,
        });
    }
});

export default router;

