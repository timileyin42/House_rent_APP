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
exports.logoutUser = exports.googleAuthCallback = exports.googleAuth = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
// Function to handle user registration
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    try {
        const userExists = yield User_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const user = yield User_1.default.create({ name, email, password: hashedPassword, role });
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('JWT_SECRET is not defined');
            return res.status(500).json({ message: 'Internal server error' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role: user.role }, jwtSecret, { expiresIn: '30d' });
        res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role, token });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
exports.registerUser = registerUser;
// Function to handle user login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user || !user.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('JWT_SECRET is not defined');
            return res.status(500).json({ message: 'Internal server error' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role: user.role }, jwtSecret, { expiresIn: '30d' });
        res.status(200).json({ id: user._id, name: user.name, email: user.email, role: user.role, token });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
exports.loginUser = loginUser;
// Function to handle Google login
exports.googleAuth = passport_1.default.authenticate('google', { scope: ['profile', 'email'] });
// Function to handle Google login callback
exports.googleAuthCallback = passport_1.default.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/dashboard',
});
// Function to logout user
const logoutUser = (req, res) => {
    req.logout((err) => {
        if (err)
            return res.status(500).json({ message: 'Logout error' });
        req.session.destroy(() => {
            res.redirect('/');
        });
    });
};
exports.logoutUser = logoutUser;
