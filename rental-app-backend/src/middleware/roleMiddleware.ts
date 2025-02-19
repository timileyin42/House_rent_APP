import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types/AuthRequest';

// Middleware to restrict access to landlords
export const landlordOnly = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'landlord') {
    // Send the response without returning
    res.status(403).json({ message: 'Access denied. Only landlords can perform this action.' });
  } else {
    next(); // Call next() if the user is a landlord
  }
};

// Middleware to restrict access to tenants
export const tenantOnly = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'tenant') {
    // Send the response without returning
    res.status(403).json({ message: 'Access denied. Only tenants can perform this action.' });
  } else {
    next(); // Call next() if the user is a tenant
  }
};
