import mongoose, { Schema, Document } from 'mongoose'

const chatMessagesCollection = 'chat_messages';

export interface IChatMessage extends Document {
    email: string;
    message: string;
    timestamp: number;
}

const ChatMessagesSchema = new Schema({
    email: { type: String, require: true, max: 100},
    message: { type: String, require: true, max: 255},
    timestamp: { type: Number, require: true}
});

ChatMessagesSchema.pre<IChatMessage>('save', function(next) {
    this.timestamp = Date.now();
    next()
})

export const ChatMessage = mongoose.model(chatMessagesCollection, ChatMessagesSchema);