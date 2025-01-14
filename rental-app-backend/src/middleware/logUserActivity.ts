import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { UserActivity } from '../models/UserActivity';

// Define a custom interface that extends the Express Request
interface AuthRequest extends ExpressRequest {
    user?: {
        _id: string; // or mongoose.Types.ObjectId if you're using Mongoose
    };
}

const logUserActivity = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?._id; // Assuming you have user info in req.user after authentication
    const action = req.method === 'GET' ? 'viewed_property' : 'other_action';

    if (userId) {
        await UserActivity.create({ userId, action });
    }

    next();
};

export default logUserActivity;
