import { Request, Response, NextFunction } from 'express';
import UserActivity from '../models/UserActivity';

const logUser Activity = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id; // Assuming you have user info in req.user after authentication
    const action = req.method === 'GET' ? 'viewed_property' : 'other_action'; 

    if (userId) {
        await UserActivity.create({ userId, action });
    }

    next();
};

export default logUser Activity;
