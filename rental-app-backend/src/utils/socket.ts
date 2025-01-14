// src/utils/socket.ts
import { Server } from 'socket.io';
import { Message } from '../models/Message';

export const setupSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinRoom', (chatId: string) => {
      socket.join(chatId);
      console.log(`User joined room: ${chatId}`);
    });

    socket.on('sendMessage', async ({ chatId, senderId, text }) => {
      try {
        const newMessage = await new Message({ senderId, chatId, text }).save();

        io.to(chatId).emit('newMessage', newMessage);
      } catch (error) {
        console.error('Error handling sendMessage event:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });
};

