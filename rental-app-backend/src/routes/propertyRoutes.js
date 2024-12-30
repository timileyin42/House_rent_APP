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
const Property_1 = require("../models/Property");
const router = express_1.default.Router();
// Get all properties
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const properties = yield Property_1.Property.find();
        res.json(properties);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching properties', error });
    }
}));
// Get a property by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const property = yield Property_1.Property.findById(req.params.id);
        if (!property)
            return res.status(404).json({ message: 'Property not found' });
        res.json(property);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching property', error });
    }
}));
// Update a property by ID
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProperty = yield Property_1.Property.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedProperty)
            return res.status(404).json({ message: 'Property not found' });
        res.json(updatedProperty);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating property', error });
    }
}));
// Delete a property by ID
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProperty = yield Property_1.Property.findByIdAndDelete(req.params.id);
        if (!deletedProperty)
            return res.status(404).json({ message: 'Property not found' });
        res.json({ message: 'Property deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting property', error });
    }
}));
exports.default = router;
