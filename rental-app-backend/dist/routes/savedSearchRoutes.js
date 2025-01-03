"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const savedSearchController_1 = require("../controllers/savedSearchController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
// Route to create a new saved search
router.post('/', authMiddleware_1.default, savedSearchController_1.createSavedSearch);
// Route to get all saved searches for a user
router.get('/:userId', authMiddleware_1.default, savedSearchController_1.getSavedSearches);
// Route to delete a saved search by ID
router.delete('/:id', authMiddleware_1.default, savedSearchController_1.deleteSavedSearch);
exports.default = router;
