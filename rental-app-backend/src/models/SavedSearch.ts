import mongoose, { Document, Schema } from 'mongoose';

interface ISavedSearch extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  criteria: Record<string, unknown>;
  favorites: mongoose.Schema.Types.ObjectId[]; // Array of property IDs
  createdAt: Date;
}

const SavedSearchSchema: Schema<ISavedSearch> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  criteria: {
    type: Map,
    of: Schema.Types.Mixed,
    required: true,
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property', // Assuming 'Property' is the model for properties
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const SavedSearch = mongoose.model<ISavedSearch>('SavedSearch', SavedSearchSchema);

