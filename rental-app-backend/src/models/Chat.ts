// src/models/Chat.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IChat extends Document {
  participants: string[];
  messages: mongoose.Types.ObjectId[];
}

const chatSchema = new Schema<IChat>(
  {
    participants: [{ type: String, required: true }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  },
  { timestamps: true }
);

export const Chat = mongoose.model<IChat>('Chat', chatSchema);

