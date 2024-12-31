import { Router, Request, Response } from 'express';
import { Property } from '../models/Property';

const router = Router();

// Get property by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  console.log(`GET /api/properties/${req.params.id} called`);
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      console.log('Property not found.');
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    console.log('Property found:', property);
    res.status(200).json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

// Update property by ID
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  console.log(`PUT /api/properties/${req.params.id} called with data:`, req.body);
  try {
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProperty) {
      console.log('Property not found for update.');
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    console.log('Property updated:', updatedProperty);
    res.status(200).json(updatedProperty);
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

// Delete property by ID
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  console.log(`DELETE /api/properties/${req.params.id} called`);
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty) {
      console.log('Property not found for deletion.');
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    console.log('Property deleted:', deletedProperty);
    res.status(200).json({ message: 'Property deleted' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

export default router;

