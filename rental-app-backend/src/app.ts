import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv-safe';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import connectDB from './config/db';
import propertyRoutes from './routes/propertyRoutes';
import messageRoutes from './routes/messageRoutes';
import authRoutes from './routes/authRoutes';
import savedSearchRoutes from './routes/savedSearchRoutes';
import maintenanceRequestRoutes from './routes/maintenanceRequestRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import paymentRoutes from './routes/paymentRoutes';
import reviewRoutes from './routes/reviewRoutes';
import chatRoutes from './routes/chatRoutes';
import { setupSocket } from './utils/socket';
import passport from './config/passport';
import session from 'express-session';
import './config/passport';
import { swaggerDocs } from './swagger/swagger'; // Correct import

// Load environment variables from .env file
dotenv.config();
console.log('Environment variables loaded...');
console.log('GEOCODING_API_URL:', process.env.GEOCODING_API_URL);
console.log('GOOGLE_MAPS_API_KEY:', process.env.GOOGLE_MAPS_API_KEY);

// Connect to the database
console.log('Connecting to the database...');
connectDB();

const app = express();

// Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Initialize Swagger documentation
swaggerDocs(app);

console.log('Enabling security middleware...');
app.use(helmet());

console.log('Enabling CORS middleware...');
app.use(cors());

console.log('Enabling JSON parser middleware...');
app.use(express.json());

// Rate Limiting
console.log('Applying rate limiter...');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// Logging middleware
if (process.env.NODE_ENV !== 'production') {
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
  });
}

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
app.use('/api/messages', messageRoutes); // Messages API

// Mount Auth routes
console.log('Mounting /api/auth route...');
app.use('/api/auth', authRoutes); // Auth API

// Mount Saved Searches routes
console.log('Mounting /api/saved-searches route...');
app.use('/api/saved-searches', savedSearchRoutes); // Saved Searches API

// Mount Maintenance Request routes
console.log('Mounting /api/maintenance-requests route...');
app.use('/api/maintenance-requests', maintenanceRequestRoutes); // Maintenance Requests API

// Mount Appointment routes
console.log('Mounting /api/appointments route...');
app.use('/api/appointments', appointmentRoutes); // Appointments API

// Mount Payment routes
console.log('Mounting /api/payments route...');
app.use('/api/payments', paymentRoutes); // Payments API

// Mount Review routes
console.log('Mounting /api/reviews route...');
app.use('/api/reviews', reviewRoutes); // Reviews API

// Mount Chat routes
console.log('Mounting /api/chat route...');
app.use('/api/chat', chatRoutes); // Chat API

// Global error-handling middleware
console.log('Adding global error-handling middleware...');
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Socket.IO Setup
console.log('Initializing Socket.IO...');
const server = createServer(app); // Create a server instance
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // Adjust later
    methods: ['GET', 'POST'],
  },
});

// Integrate the socket setup utility
setupSocket(io);

// App initialization complete
console.log('App initialization complete...');
export default app;