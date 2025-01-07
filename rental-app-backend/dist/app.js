"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const db_1 = __importDefault(require("./config/db"));
const propertyRoutes_1 = __importDefault(require("./routes/propertyRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const savedSearchRoutes_1 = __importDefault(require("./routes/savedSearchRoutes"));
const maintenanceRequestRoutes_1 = __importDefault(require("./routes/maintenanceRequestRoutes"));
const appointmentRoutes_1 = __importDefault(require("./routes/appointmentRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
// Load environment variables from .env file
dotenv_safe_1.default.config();
console.log('Environment variables loaded...');
// Connect to the database
console.log('Connecting to the database...');
(0, db_1.default)();
const app = (0, express_1.default)();
// Middleware
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
// Swagger Documentation
console.log('Mounting Swagger documentation...');
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(require('./swagger.json')));
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
// Global error-handling middleware
console.log('Adding global error-handling middleware...');
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.stack);
    res.status(500).json({ message: 'Internal server error', error: err.message });
});
// App initialization complete
console.log('App initialization complete...');
exports.default = app;
