"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const car_controller_1 = require("../controllers/car.controller");
const multerConfig_1 = __importDefault(require("../config/multerConfig"));
const router = express_1.default.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - make
 *         - carModel
 *         - year
 *         - mileage
 *         - price
 *         - description
 *         - seller
 *       properties:
 *         make:
 *           type: string
 *         carModel:
 *           type: string
 *         year:
 *           type: integer
 *         mileage:
 *           type: integer
 *         price:
 *           type: number
 *         description:
 *           type: string
 *         seller:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         isSold:
 *           type: boolean
 *
 * /api/cars:
 *   post:
 *     tags: [Car]
 *     summary: Add a new car listing
 *     description: Create a new car listing with details and images.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       201:
 *         description: Car listing created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 car:
 *                   type: string
 *       500:
 *         description: Server error
 */
router.post('/', multerConfig_1.default, car_controller_1.addCar);
/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the car listing
 *         make:
 *           type: string
 *           description: The make of the car
 *         carModel:
 *           type: string
 *           description: The model of the car
 *         year:
 *           type: integer
 *           description: The year of the car
 *         mileage:
 *           type: integer
 *           description: The mileage of the car
 *         price:
 *           type: number
 *           description: The price of the car
 *         description:
 *           type: string
 *           description: A detailed description of the car
 *         seller:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: The name of the seller
 *             email:
 *               type: string
 *               description: The email of the seller
 *             phone:
 *               type: string
 *               description: The phone number of the seller
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             description: URL of the car images
 *         isSold:
 *           type: boolean
 *           description: Indicates if the car is sold

 * /api/cars:
 *   get:
 *     tags: [Car]
 *     summary: Search and filter cars
 *     description: Retrieve a list of cars based on filter criteria such as make, model, year, price, and mileage.
 *     parameters:
 *       - in: query
 *         name: make
 *         required: false
 *         description: The make of the car to filter by.
 *         schema:
 *           type: string
 *       - in: query
 *         name: carModel
 *         required: false
 *         description: The model of the car to filter by.
 *         schema:
 *           type: string
 *       - in: query
 *         name: yearMin
 *         required: false
 *         description: Minimum year of the car to filter by.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: yearMax
 *         required: false
 *         description: Maximum year of the car to filter by.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: priceMin
 *         required: false
 *         description: Minimum price of the car to filter by.
 *         schema:
 *           type: number
 *       - in: query
 *         name: priceMax
 *         required: false
 *         description: Maximum price of the car to filter by.
 *         schema:
 *           type: number
 *       - in: query
 *         name: mileageMin
 *         required: false
 *         description: Minimum mileage of the car to filter by.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: mileageMax
 *         required: false
 *         description: Maximum mileage of the car to filter by.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sortBy
 *         required: false
 *         description: The field by which to sort the results (e.g., price, year).
 *         schema:
 *           type: string
 *       - in: query
 *         name: order
 *         required: false
 *         description: The order of sorting (asc or desc).
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: List of cars retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Car'
 *       500:
 *         description: Server error
 */
router.get('/', car_controller_1.getCars);
/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - make
 *         - carModel
 *         - year
 *         - mileage
 *         - price
 *         - description
 *         - seller
 *       properties:
 *         make:
 *           type: string
 *         carModel:
 *           type: string
 *         year:
 *           type: integer
 *         mileage:
 *           type: integer
 *         price:
 *           type: number
 *         description:
 *           type: string
 *         seller:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         isSold:
 *           type: boolean
 *
 *     CarDetailResponse:
 *       type: object
 *       properties:
 *         data:
 *           $ref: '#/components/schemas/Car'
 *
 * /api/cars/detail/{id}:
 *   get:
 *     tags: [Car]
 *     summary: Get car details
 *     description: Retrieve detailed information about a specific car listing by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarDetailResponse'
 *       404:
 *         description: Car not found
 *       500:
 *         description: Server error
 */
router.get('/detail/:id', car_controller_1.getCarDetails);
exports.default = router;
