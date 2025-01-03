import mongoose, { Document, Schema } from 'mongoose';

interface ISavedSearch extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  criteria: Record<string, unknown>;
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const SavedSearch = mongoose.model<ISavedSearch>('SavedSearch', SavedSearchSchema);

