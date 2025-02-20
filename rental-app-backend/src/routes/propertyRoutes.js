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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var axios_1 = require("axios");
var propertyController_1 = require("../controllers/propertyController");
var validation_1 = require("../middleware/validation");
var authMiddleware_1 = require("../middleware/authMiddleware");
var roleMiddleware_1 = require("../middleware/roleMiddleware");
dotenv_1.default.config();
var router = (0, express_1.Router)();
var GEOCODING_API_URL = process.env.GEOCODING_API_URL;
var GEOCODING_API_KEY = process.env.GEOCODING_API_KEY;
/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Endpoints for property management and analytics.
 */
/**
 * @swagger
 * /properties/search:
 *   get:
 *     summary: Search for properties
 *     description: Retrieve properties based on filters like location, price, and features.
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter properties by location.
 *       - in: query
 *         name: price_min
 *         schema:
 *           type: number
 *         description: Minimum price filter.
 *       - in: query
 *         name: price_max
 *         schema:
 *           type: number
 *         description: Maximum price filter.
 *     responses:
 *       200:
 *         description: Properties found.
 */
router.get('/search', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var location_1, latitude, longitude, geoResponse, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                location_1 = req.query.location;
                latitude = void 0, longitude = void 0;
                if (!location_1) return [3 /*break*/, 2];
                return [4 /*yield*/, axios_1.default.get(GEOCODING_API_URL, {
                        params: { address: location_1, key: GEOCODING_API_KEY },
                    })];
            case 1:
                geoResponse = _a.sent();
                if (geoResponse.data.results.length === 0) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid location provided.' })];
                }
                latitude = geoResponse.data.results[0].geometry.location.lat;
                longitude = geoResponse.data.results[0].geometry.location.lng;
                _a.label = 2;
            case 2:
                req.query.latitude = latitude;
                req.query.longitude = longitude;
                return [2 /*return*/, (0, propertyController_1.searchProperties)(req, res, next)];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error fetching geolocation.', error: error_1.message })];
            case 4: return [2 /*return*/];
        }
    });
}); });
/**
 * @swagger
 * /properties/{id}:
 *   get:
 *     summary: Get property details
 *     description: Retrieve details of a specific property by ID.
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The property ID.
 *     responses:
 *       200:
 *         description: Property details retrieved successfully.
 */
router.get('/:id', propertyController_1.getPropertyById);
/**
 * @swagger
 * /properties/{id}/view:
 *   post:
 *     summary: Track property views
 *     description: Log a view for a specific property.
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The property ID.
 *     responses:
 *       200:
 *         description: Property view recorded.
 */
router.post('/:id/view', propertyController_1.trackPropertyView);
/**
 * @swagger
 * /properties/{id}/inquiry:
 *   post:
 *     summary: Track property inquiries
 *     description: Log an inquiry for a specific property.
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The property ID.
 *     responses:
 *       200:
 *         description: Inquiry recorded successfully.
 */
router.post('/:id/inquiry', propertyController_1.trackPropertyInquiry);
/**
 * @swagger
 * /properties/{id}/analytics:
 *   get:
 *     summary: Get property analytics
 *     description: Retrieve analytics such as number of views and inquiries (landlord-only).
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The property ID.
 *     responses:
 *       200:
 *         description: Property analytics retrieved.
 *       403:
 *         description: Access forbidden (only landlords allowed).
 */
router.get('/:id/analytics', authMiddleware_1.default, roleMiddleware_1.landlordOnly, propertyController_1.getPropertyAnalytics);
/**
 * @swagger
 * /properties:
 *   post:
 *     summary: Create a new property
 *     description: Add a new property (landlord-only).
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Property title.
 *               location:
 *                 type: string
 *                 description: Property location.
 *               price:
 *                 type: number
 *                 description: Rental price.
 *               description:
 *                 type: string
 *                 description: Property description.
 *     responses:
 *       201:
 *         description: Property created successfully.
 *       403:
 *         description: Access forbidden (only landlords allowed).
 */
router.post('/', authMiddleware_1.default, roleMiddleware_1.landlordOnly, validation_1.validateProperty, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var location_2, geoResponse, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                location_2 = req.body.location;
                return [4 /*yield*/, axios_1.default.get(GEOCODING_API_URL, {
                        params: { address: location_2, key: GEOCODING_API_KEY },
                    })];
            case 1:
                geoResponse = _a.sent();
                if (geoResponse.data.results.length === 0) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid location provided.' })];
                }
                req.body.latitude = geoResponse.data.results[0].geometry.location.lat;
                req.body.longitude = geoResponse.data.results[0].geometry.location.lng;
                return [2 /*return*/, (0, propertyController_1.createProperty)(req, res, next)];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error fetching geolocation.', error: error_2.message })];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * @swagger
 * /properties/{id}:
 *   put:
 *     summary: Update property details
 *     description: Modify an existing property (landlord-only).
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The property ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               location:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Property updated successfully.
 *       403:
 *         description: Access forbidden (only landlords allowed).
 */
router.put('/:id', authMiddleware_1.default, roleMiddleware_1.landlordOnly, propertyController_1.updatePropertyById);
/**
 * @swagger
 * /properties/{id}:
 *   delete:
 *     summary: Delete a property
 *     description: Remove an existing property (landlord-only).
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The property ID.
 *     responses:
 *       200:
 *         description: Property deleted successfully.
 *       403:
 *         description: Access forbidden (only landlords allowed).
 */
router.delete('/:id', authMiddleware_1.default, roleMiddleware_1.landlordOnly, propertyController_1.deletePropertyById);
exports.default = router;
