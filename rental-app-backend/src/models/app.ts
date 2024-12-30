import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Placeholder for routes
app.get('/', (req, res) => res.send('API is running'));

export default app;

