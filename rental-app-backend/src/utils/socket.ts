import { Server } from 'socket.io';
import Chat from './models/Chat';

const initializeSocket = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: '*', // Update with the actual frontend URL
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // Listen for messages
        socket.on('sendMessage', async (data) => {
            const { senderId, receiverId, message } = data;

            try {
                // Save message in database
                const newMessage = await Chat.create({ senderId, receiverId, message });
                io.to(receiverId).emit('receiveMessage', newMessage);
            } catch (error) {
                console.error('Error saving message:', error);
            }
        });

        // Join user-specific rooms for targeted communication
        socket.on('joinRoom', (userId) => {
            socket.join(userId);
            console.log(`User joined room: ${userId}`);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    return io;
};

export default initializeSocket;

