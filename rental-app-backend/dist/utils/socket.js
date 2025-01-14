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
exports.setupSocket = void 0;
const Message_1 = require("../models/Message");
const setupSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);
        socket.on('joinRoom', (chatId) => {
            socket.join(chatId);
            console.log(`User joined room: ${chatId}`);
        });
        socket.on('sendMessage', (_a) => __awaiter(void 0, [_a], void 0, function* ({ chatId, senderId, text }) {
            try {
                const newMessage = yield new Message_1.Message({ senderId, chatId, text }).save();
                io.to(chatId).emit('newMessage', newMessage);
            }
            catch (error) {
                console.error('Error handling sendMessage event:', error);
            }
        }));
        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
    });
};
exports.setupSocket = setupSocket;
