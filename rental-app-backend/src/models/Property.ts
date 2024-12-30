import mongoose, { Document, Schema } from 'mongoose';

interface IProperty extends Document {
  title: string;
  description: string;
  address: string;
  price: number;
  landlord: mongoose.Schema.Types.ObjectId;
  images: string[];
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
      ref: 'User',
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true } // Automatically creates `createdAt` and `updatedAt` fields
);

export const Property = mongoose.model<IProperty>('Property', PropertySchema);

