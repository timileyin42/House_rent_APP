"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const express_1 = require("express");
const dotenv = __importStar(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const propertyController_1 = require("../controllers/propertyController");
const validation_1 = require("../middleware/validation");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const roleMiddleware_1 = require("../middleware/roleMiddleware");
dotenv.config();
const router = (0, express_1.Router)();
const GEOCODING_API_URL = process.env.GEOCODING_API_URL;
const GEOCODING_API_KEY = process.env.GEOCODING_API_KEY;
// Validate environment variables
if (!GEOCODING_API_URL || !GEOCODING_API_KEY) {
    throw new Error('Geocoding API URL or API key is missing in environment variables.');
}
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
router.get('/search', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { location } = req.query;
        let latitude, longitude;
        if (location) {
            const geoResponse = yield axios_1.default.get(GEOCODING_API_URL, {
                params: { address: location, key: GEOCODING_API_KEY },
            });
            if (geoResponse.data.results.length === 0) {
                res.status(400).json({ message: 'Invalid location provided.' });
                return;
            }
            latitude = geoResponse.data.results[0].geometry.location.lat;
            longitude = geoResponse.data.results[0].geometry.location.lng;
        }
        req.query.latitude = latitude;
        req.query.longitude = longitude;
        // Call the controller function without passing `next`
        yield (0, propertyController_1.searchProperties)(req, res);
    }
    catch (error) {
        next(error); // Pass errors to the error-handling middleware
    }
}));
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
router.post('/', authMiddleware_1.default, roleMiddleware_1.landlordOnly, validation_1.validateProperty, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { location } = req.body;
        const geoResponse = yield axios_1.default.get(GEOCODING_API_URL, {
            params: { address: location, key: GEOCODING_API_KEY },
        });
        if (geoResponse.data.results.length === 0) {
            res.status(400).json({ message: 'Invalid location provided.' });
            return;
        }
        req.body.latitude = geoResponse.data.results[0].geometry.location.lat;
        req.body.longitude = geoResponse.data.results[0].geometry.location.lng;
        // Call the controller function without passing `next`
        yield (0, propertyController_1.createProperty)(req, res);
    }
    catch (error) {
        next(error); // Pass errors to the error-handling middleware
    }
}));
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
