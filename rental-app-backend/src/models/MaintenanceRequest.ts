import mongoose, { Schema, Document } from 'mongoose';

interface IMaintenanceRequest extends Document {
    tenant: mongoose.Schema.Types.ObjectId;
    property: mongoose.Schema.Types.ObjectId;
    description: string;
    status: string; // e.g., 'Pending', 'In Progress', 'Completed'
    createdAt: Date;
    updatedAt: Date;
}

const MaintenanceRequestSchema: Schema<IMaintenanceRequest> = new Schema(
    {
        tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
        description: { type: String, required: true, trim: true },
        status: { type: String, default: 'Pending' },
    },
    { timestamps: true }
);

export const MaintenanceRequest = mongoose.model<IMaintenanceRequest>('MaintenanceRequest', MaintenanceRequestSchema);

