"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const propertyRoutes_1 = __importDefault(require("./routes/propertyRoutes")); // Import Property routes
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes")); // Import Message routes
// Load environment variables from .env file
dotenv_1.default.config();
// Connect to the database
(0, db_1.default)();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Define routes
app.get('/', (req, res) => {
    res.send('API is running');
});
// Mount Property and Message routes
app.use('/api/properties', propertyRoutes_1.default); // Properties API
app.use('/api/messages', messageRoutes_1.default); // Messages API
// Export the app for use in other modules
exports.default = app;
