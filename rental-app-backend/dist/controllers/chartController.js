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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.getMessages = void 0;
const Chat_1 = __importDefault(require("../models/Chat"));
const Message_1 = __importDefault(require("../models/Message"));
// Get all messages in a chat
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params;
    try {
        const chat = yield Chat_1.default.findById(chatId).populate('messages.senderId', 'name email');
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.status(200).json(chat.message);
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching messages',
            error: error.message,
        });
    }
});
exports.getMessages = getMessages;
// Send a message
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params;
    const { senderId, content } = req.body;
    try {
        const newMessage = new Message_1.default({ senderId, content });
        const savedMessage = yield newMessage.save();
        const chat = yield Chat_1.default.findByIdAndUpdate(chatId, { $push: { message: savedMessage._id } }, { new: true });
        res.status(201).json(chat);
    }
    catch (error) {
        res.status(500).json({
            message: 'Error sending message',
            error: error.message,
        });
    }
});
exports.sendMessage = sendMessage;
