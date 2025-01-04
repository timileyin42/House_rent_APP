"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../controllers/messageController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.get('/tenant/:tenantId', authMiddleware_1.default, messageController_1.getTenantMessages);
router.post('/', messageController_1.sendMessage);
router.get('/', messageController_1.getMessages);
exports.default = router;
