import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
    message: string;
    isRead: boolean;
    createdAt: Date;
}

const ChatSchema: Schema = new Schema({
    senderId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IMessage>('Chat', ChatSchema);

