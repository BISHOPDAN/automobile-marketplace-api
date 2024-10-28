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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const car_model_1 = __importDefault(require("../models/car.model"));
const car_controller_1 = require("../controllers/car.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Use the controller functions in your app
app.post('/api/cars/cars', car_controller_1.addCar);
app.get('/api/cars/cars', car_controller_1.getCars);
app.get('/api/cars/cars/:id', car_controller_1.getCarDetails);
// Set up a test database connection before tests
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const mongoUri = 'mongodb://localhost:27017/test';
    yield mongoose_1.default.connect(mongoUri);
}));
// Clean up the database after each test
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield car_model_1.default.deleteMany({});
}));
// Close the connection after all tests
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe('Car Controller', () => {
    describe('POST /api/cars/cars', () => {
        it('should create a new car listing', () => __awaiter(void 0, void 0, void 0, function* () {
            const newCar = {
                make: 'Toyota',
                carModel: 'Camry',
                year: 2021,
                mileage: 15000,
                price: 24000,
                description: 'A reliable sedan',
                seller: { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
                images: ['image1.jpg', 'image2.jpg'],
                isSold: false,
            };
            const response = yield (0, supertest_1.default)(app).post('/api/cars/cars').send(newCar);
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Car listing created successfully');
            expect(response.body.car).toBeDefined();
        }));
        it('should return 400 if required fields are missing', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/api/cars/cars').send({});
            expect(response.body.error).toBeDefined();
        }));
    });
    describe('GET /api/cars/cars', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield car_model_1.default.create({
                make: 'Toyota',
                carModel: 'Camry',
                year: 2021,
                mileage: 15000,
                price: 24000,
                description: 'A reliable sedan',
                seller: { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
                images: ['image1.jpg', 'image2.jpg'],
                isSold: false,
            });
        }));
        it('should fetch cars with filters', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get('/api/cars/cars').query({ make: 'Toyota' });
            expect(response.status).toBe(200);
            expect(response.body.data).toHaveLength(1);
            expect(response.body.data[0].make).toBe('Toyota');
        }));
        it('should return 200 and an empty array if no cars match the filters', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get('/api/cars/cars').query({ make: 'Ford' });
            expect(response.status).toBe(200);
            expect(response.body.data).toHaveLength(0);
        }));
        it('should return 500 on server error', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(car_model_1.default, 'find').mockImplementationOnce(() => {
                throw new Error('Database error');
            });
            const response = yield (0, supertest_1.default)(app).get('/api/cars/cars');
            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Server error');
        }));
    });
    describe('GET /api/cars/cars/:Id', () => {
        let carId;
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            const car = yield car_model_1.default.create({
                make: 'Toyota',
                carModel: 'Camry',
                year: 2021,
                mileage: 15000,
                price: 24000,
                description: 'A reliable sedan',
                seller: { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
                images: ['image1.jpg', 'image2.jpg'],
                isSold: false,
            });
            carId = car._id;
        }));
        it('should return car details for a valid carId', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get(`/api/cars/cars/${carId}`);
            expect(response.status).toBe(200);
            expect(response.body.data).toBeDefined();
        }));
        it('should return 500 on server error', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(car_model_1.default, 'findOne').mockImplementationOnce(() => {
                throw new Error('Database error');
            });
            const response = yield (0, supertest_1.default)(app).get(`/api/cars/cars/${carId}`);
            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Server error');
        }));
    });
});
