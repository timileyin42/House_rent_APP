"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.getChatHistory = void 0;
const Chat_1 = require("../models/Chat");
const Message_1 = require("../models/Message");
// Controller to fetch chat history
const getChatHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatId } = req.params;
        // Validate chatId
        if (!chatId) {
            res.status(400).json({ message: 'Chat ID is required' });
            return;
        }
        // Fetch chat and populate messages
        const chat = yield Chat_1.Chat.findById(chatId).populate('messages');
        if (!chat) {
            res.status(404).json({ message: 'Chat not found' });
            return;
        }
        res.status(200).json(chat.messages);
    }
    catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({
            message: 'Error fetching chat history',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.getChatHistory = getChatHistory;
// Controller to send a message
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatId } = req.params;
        const { senderId, text } = req.body;
        // Validate inputs
        if (!chatId || !senderId || !text) {
            res.status(400).json({ message: 'Chat ID, sender ID, and text are required' });
            return;
        }
        // Create a new message
        const newMessage = yield new Message_1.Message({ senderId, chatId, text }).save();
        // Update the chat with the new message
        const updatedChat = yield Chat_1.Chat.findByIdAndUpdate(chatId, { $push: { messages: newMessage._id } }, { new: true });
        if (!updatedChat) {
            res.status(404).json({ message: 'Chat not found' });
            return;
        }
        res.status(201).json(newMessage);
    }
    catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({
            message: 'Error sending message',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.sendMessage = sendMessage;
