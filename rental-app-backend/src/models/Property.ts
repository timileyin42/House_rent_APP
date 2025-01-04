import mongoose, { Document, Schema } from 'mongoose';

interface IProperty extends Document {
  title: string;
  description: string;
  address: string;
  price: number;
  landlord: mongoose.Schema.Types.ObjectId;
  images: string[];
  propertyType?: string;
  bedrooms?: number;
  views: number; // Add this line
  inquiries: number; // Add this line
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema: Schema<IProperty> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    landlord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User ',
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    propertyType: {
      type: String,
      enum: ['Apartment', 'House', 'Studio', 'Condo'],
    },
    bedrooms: {
      type: Number,
    },
    views: {
      type: Number,
      default: 0, // Initialize views to 0
    },
    inquiries: {
      type: Number,
      default: 0, // Initialize inquiries to 0
    },
  },
  { timestamps: true } // Automatically creates `createdAt` and `updatedAt` fields
);

export const Property = mongoose.model<IProperty>('Property', PropertySchema);
