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
exports.getCarDetails = exports.getCars = exports.addCar = void 0;
const car_model_1 = __importDefault(require("../models/car.model"));
// Add a new car listing
const addCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { make, carModel, year, mileage, price, description, seller, isSold } = req.body;
        // Type assertion to ensure req.files is treated as an array of files
        const images = req.files ? req.files.map((file) => file.path) : [];
        const newCar = new car_model_1.default({ make, carModel, year, mileage, price, description, seller, images, isSold });
        yield newCar.save();
        res.status(201).json({ message: 'Car listing created successfully', car: newCar._id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.addCar = addCar;
// Search and filter cars
const getCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Build the filter object based on query parameters
        const { make, carModel, yearMin, yearMax, priceMin, priceMax, mileageMin, mileageMax, sortBy, order, } = req.query;
        const filters = {};
        // Add filters based on the query parameters
        if (make)
            filters.make = make;
        if (carModel)
            filters.carModel = carModel;
        if (yearMin || yearMax) {
            filters.year = {};
            if (yearMin)
                filters.year.$gte = Number(yearMin);
            if (yearMax)
                filters.year.$lte = Number(yearMax);
        }
        if (priceMin || priceMax) {
            filters.price = {};
            if (priceMin)
                filters.price.$gte = Number(priceMin);
            if (priceMax)
                filters.price.$lte = Number(priceMax);
        }
        if (mileageMin || mileageMax) {
            filters.mileage = {};
            if (mileageMin)
                filters.mileage.$gte = Number(mileageMin);
            if (mileageMax)
                filters.mileage.$lte = Number(mileageMax);
        }
        // Fetch cars with filters
        const cars = yield car_model_1.default.find(filters).select('make carModel year price images');
        // Sort results if sortBy is provided and is a valid key
        if (sortBy && typeof sortBy === 'string' && sortBy in cars[0]) {
            const sortOrder = order === 'desc' ? -1 : 1;
            // Sort cars based on the specified field
            cars.sort((a, b) => {
                if (a[sortBy] > b[sortBy]) {
                    return sortOrder;
                }
                else if (a[sortBy] < b[sortBy]) {
                    return -sortOrder;
                }
                else {
                    return 0;
                }
            });
        }
        res.status(200).json({ data: cars });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getCars = getCars;
// Search and filter cars
const getCarDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Build the filter object based on query parameters
        const { carId } = req.query;
        const car = yield car_model_1.default.findOne({ _id: carId });
        res.status(200).json({ data: car });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getCarDetails = getCarDetails;
