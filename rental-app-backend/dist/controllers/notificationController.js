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
exports.markNotificationsAsRead = exports.getUserNotifications = void 0;
const Notification_1 = __importDefault(require("../models/Notification"));
// Fetch user notifications
const getUserNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const notifications = yield Notification_1.default.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching notifications',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.getUserNotifications = getUserNotifications;
// Mark notifications as read
const markNotificationsAsRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        if (!userId) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }
        yield Notification_1.default.updateMany({ userId, isRead: false }, { isRead: true });
        res.status(200).json({ message: 'Notifications marked as read' });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error marking notifications as read',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.markNotificationsAsRead = markNotificationsAsRead;
