import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
      id?: string;
      email?: string;
      role?: string; // Ensure role is included here
      [key: string]: any;
  };
}