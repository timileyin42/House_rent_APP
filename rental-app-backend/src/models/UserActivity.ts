import mongoose, { Document, Schema } from 'mongoose';

export interface IUserActivity extends Document {
    userId: mongoose.Types.ObjectId; // Reference to the user
    action: string; // e.g., 'viewed_property', 'logged_in', 'created_listing'
    timestamp: Date; // When the action occurred
}

const UserActivitySchema: Schema = new Schema<IUser Activity>({
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User ' },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IUser Activity>('User Activity', UserActivitySchema);
