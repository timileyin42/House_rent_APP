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
exports.getMessages = exports.sendMessage = void 0;
const Message_1 = require("../models/Message");
// Send a new message
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sender, recipient, property, content } = req.body;
        // Validation (optional, but you can add custom validation logic here)
        if (!sender || !recipient || !property || !content) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        const newMessage = new Message_1.Message({ sender, recipient, property, content });
        const savedMessage = yield newMessage.save();
        res.status(201).json(savedMessage);
    }
    catch (error) {
        res.status(500).json({ message: 'Error sending message', error });
    }
});
exports.sendMessage = sendMessage;
// Get all messages
const getMessages = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield Message_1.Message.find()
            .populate('sender', 'name email')
            .populate('recipient', 'name email')
            .populate('property', 'title address');
        res.json(messages);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
});
exports.getMessages = getMessages;
