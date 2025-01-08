import mongoose, { Schema, Document } from 'mongoose';

// Define the IUserActivity interface
export interface IUserActivity extends Document {
    userId: mongoose.Schema.Types.ObjectId; // Reference to the user
    action: string; // e.g., 'viewed_property', 'logged_in', 'created_listing'
    timestamp: Date; // When the action occurred
}

// Define the UserActivity schema
const UserActivitySchema: Schema<IUserActivity> = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User ', // Ensure this references the correct User model
            required: true,
        },
        action: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Export the UserActivity model
export const UserActivity = mongoose.model<IUser Activity>('UserActivity', UserActivitySchema);
