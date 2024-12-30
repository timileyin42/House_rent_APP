import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import propertyRoutes from './routes/propertyRoutes'; // Import Property routes
import messageRoutes from './routes/messageRoutes';   // Import Message routes

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define routes
app.get('/', (req: Request, res: Response) => {
    res.send('API is running');
});

// Mount Property and Message routes
app.use('/api/properties', propertyRoutes); // Properties API
app.use('/api/messages', messageRoutes);   // Messages API

// Export the app for use in other modules
export default app;

