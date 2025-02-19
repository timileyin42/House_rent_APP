"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantOnly = exports.landlordOnly = void 0;
// Middleware to restrict access to landlords
var landlordOnly = function (req, res, next) {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'landlord') {
        // Send the response without returning
        res.status(403).json({ message: 'Access denied. Only landlords can perform this action.' });
    }
    else {
        next(); // Call next() if the user is a landlord
    }
};
exports.landlordOnly = landlordOnly;
// Middleware to restrict access to tenants
var tenantOnly = function (req, res, next) {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'tenant') {
        // Send the response without returning
        res.status(403).json({ message: 'Access denied. Only tenants can perform this action.' });
    }
    else {
        next(); // Call next() if the user is a tenant
    }
};
exports.tenantOnly = tenantOnly;
