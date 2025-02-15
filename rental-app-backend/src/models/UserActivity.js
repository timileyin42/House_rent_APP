"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivity = void 0;
var mongoose_1 = require("mongoose");
// Define the UserActivity schema
var UserActivitySchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User ',
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true } // Automatically manage createdAt and updatedAt fields
);
// Export the UserActivity model
exports.UserActivity = mongoose_1.default.model('UserActivity', UserActivitySchema);
