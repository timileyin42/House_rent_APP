import * as jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/AuthRequest';
export { AuthRequest };
import { Request, Response, NextFunction } from 'express';


const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as {
                id: string;
                email: string;
                role: string; // Ensure role is included in the decoded token
            };
            req.user = decoded; // Attach user info to the request
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export default protect;
