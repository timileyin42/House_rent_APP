"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const db_1 = __importDefault(require("./config/db"));
const propertyRoutes_1 = __importDefault(require("./routes/propertyRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const savedSearchRoutes_1 = __importDefault(require("./routes/savedSearchRoutes"));
const maintenanceRequestRoutes_1 = __importDefault(require("./routes/maintenanceRequestRoutes"));
const appointmentRoutes_1 = __importDefault(require("./routes/appointmentRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const socket_1 = require("./utils/socket");
const express_session_1 = __importDefault(require("express-session"));
require("./config/passport");
const swagger_1 = require("./swagger/swagger"); // Correct import
// Load environment variables from .env file
dotenv_safe_1.default.config();
console.log('Environment variables loaded...');
console.log('GEOCODING_API_URL:', process.env.GEOCODING_API_URL);
console.log('GOOGLE_MAPS_API_KEY:', process.env.GOOGLE_MAPS_API_KEY);
// Connect to the database
console.log('Connecting to the database...');
(0, db_1.default)();
const app = (0, express_1.default)();
// Middleware
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
}));
// Initialize Swagger documentation
(0, swagger_1.swaggerDocs)(app); // Correct usage
console.log('Enabling security middleware...');
app.use((0, helmet_1.default)());
console.log('Enabling CORS middleware...');
app.use((0, cors_1.default)());
console.log('Enabling JSON parser middleware...');
app.use(express_1.default.json());
// Rate Limiting
console.log('Applying rate limiter...');
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);
// Logging middleware
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log(`${req.method} request for '${req.url}'`);
        next();
    });
}
// Define routes
console.log('Defining root route...');
app.get('/', (req, res) => {
    console.log('Root route accessed...');
    res.send('API is running');
});
// Mount Property and Message routes
console.log('Mounting /api/properties route...');
app.use('/api/properties', propertyRoutes_1.default); // Properties API
console.log('Mounting /api/messages route...');
app.use('/api/messages', messageRoutes_1.default); // Messages API
// Mount Auth routes
console.log('Mounting /api/auth route...');
app.use('/api/auth', authRoutes_1.default); // Auth API
// Mount Saved Searches routes
console.log('Mounting /api/saved-searches route...');
app.use('/api/saved-searches', savedSearchRoutes_1.default); // Saved Searches API
// Mount Maintenance Request routes
console.log('Mounting /api/maintenance-requests route...');
app.use('/api/maintenance-requests', maintenanceRequestRoutes_1.default); // Maintenance Requests API
// Mount Appointment routes
console.log('Mounting /api/appointments route...');
app.use('/api/appointments', appointmentRoutes_1.default); // Appointments API
// Mount Payment routes
console.log('Mounting /api/payments route...');
app.use('/api/payments', paymentRoutes_1.default); // Payments API
// Mount Review routes
console.log('Mounting /api/reviews route...');
app.use('/api/reviews', reviewRoutes_1.default); // Reviews API
// Mount Chat routes
console.log('Mounting /api/chat route...');
app.use('/api/chat', chatRoutes_1.default); // Chat API
// Global error-handling middleware
console.log('Adding global error-handling middleware...');
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.stack);
    res.status(500).json({ message: 'Internal server error', error: err.message });
});
// Socket.IO Setup
console.log('Initializing Socket.IO...');
const server = (0, http_1.createServer)(app); // Create a server instance
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*', // Adjust later
        methods: ['GET', 'POST'],
    },
});
// Integrate the socket setup utility
(0, socket_1.setupSocket)(io);
// App initialization complete
console.log('App initialization complete...');
exports.default = app;
