import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import propertyRoutes from './routes/propertyRoutes'; // Import Property routes
import messageRoutes from './routes/messageRoutes';   // Import Message routes

// Load environment variables from .env file
dotenv.config();
console.log('Environment variables loaded...');

// Connect to the database
console.log('Connecting to the database...');
connectDB();

const app = express();

// Middleware
console.log('Enabling CORS middleware...');
app.use(cors());
console.log('Enabling JSON parser middleware...');
app.use(express.json());

// Define routes
console.log('Defining root route...');
app.get('/', (req: Request, res: Response) => {
  console.log('Root route accessed...');
  res.send('API is running');
});

// Mount Property and Message routes
console.log('Mounting /api/properties route...');
app.use('/api/properties', propertyRoutes); // Properties API

console.log('Mounting /api/messages route...');
app.use('/api/messages', messageRoutes);   // Messages API

console.log('App initialization complete...');
export default app;

