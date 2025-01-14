// src/controllers/chatController.ts
import { Request, Response } from 'express';
import { Chat } from '../models/Chat';
import { Message } from '../models/Message';

// Controller to fetch chat history
export const getChatHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { chatId } = req.params;

    // Validate chatId
    if (!chatId) {
      res.status(400).json({ message: 'Chat ID is required' });
      return;
    }

    // Fetch chat and populate messages
    const chat = await Chat.findById(chatId).populate('messages');
    if (!chat) {
      res.status(404).json({ message: 'Chat not found' });
      return;
    }

    res.status(200).json(chat.messages);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({
      message: 'Error fetching chat history',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Controller to send a message
export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { chatId } = req.params;
    const { senderId, text } = req.body;

    // Validate inputs
    if (!chatId || !senderId || !text) {
      res.status(400).json({ message: 'Chat ID, sender ID, and text are required' });
      return;
    }

    // Create a new message
    const newMessage = await new Message({ senderId, chatId, text }).save();

    // Update the chat with the new message
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { messages: newMessage._id } },
      { new: true }
    );

    if (!updatedChat) {
      res.status(404).json({ message: 'Chat not found' });
      return;
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      message: 'Error sending message',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

