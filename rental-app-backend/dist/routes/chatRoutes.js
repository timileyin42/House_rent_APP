"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/chatRoutes.ts
const express_1 = require("express");
const chatController_1 = require("../controllers/chatController");
const router = (0, express_1.Router)();
router.get('/:chatId', chatController_1.getChatHistory);
router.post('/:chatId/sendMessage', chatController_1.sendMessage);
exports.default = router;
