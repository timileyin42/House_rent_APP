import mongoose, { Document, Schema } from 'mongoose';

interface IProperty extends Document {
  title: string;
  description: string;
  address: string;
  latitude?: number;  // Added for map integration
  longitude?: number; // Added for map integration
  price: number;
  landlord: mongoose.Schema.Types.ObjectId;
  images: string[];
  propertyType?: string;
  bedrooms?: number;
  views: number;
  inquiries: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema: Schema<IProperty> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: false }, // New field
    longitude: { type: Number, required: false }, // New field
    price: { type: Number, required: true },
    landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: { type: [String], default: [] },
    propertyType: { type: String, enum: ['Apartment', 'House', 'Studio', 'Condo'] },
    bedrooms: { type: Number },
    views: { type: Number, default: 0 },
    inquiries: { type: Number, default: 0 },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
  },
  { timestamps: true }
);

export const Property = mongoose.model<IProperty>('Property', PropertySchema);
