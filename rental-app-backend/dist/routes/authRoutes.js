"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// Route for user registration
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, authController_1.registerUser)(req, res);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
    }
}));
// Route for user login
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, authController_1.loginUser)(req, res);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
    }
}));
// Route to fetch all users
router.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, userController_1.getAllUsers)(req, res);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
    }
}));
// Route to fetch a user by ID
router.get('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, userController_1.getUserById)(req, res);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
    }
}));
exports.default = router;
