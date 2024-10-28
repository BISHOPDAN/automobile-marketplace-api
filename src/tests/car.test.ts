import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import Car from '../models/car.model';
import { addCar, getCars, getCarDetails } from '../controllers/car.controller';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the controller functions in your app
app.post('/api/cars/cars', addCar);
app.get('/api/cars/cars', getCars);
app.get('/api/cars/cars/:id', getCarDetails);

// Set up a test database connection before tests
beforeAll(async () => {
    const mongoUri = 'mongodb://localhost:27017/test';
    await mongoose.connect(mongoUri);
});

// Clean up the database after each test
afterEach(async () => {
    await Car.deleteMany({});
});

// Close the connection after all tests
afterAll(async () => {
    await mongoose.connection.close();
});

describe('Car Controller', () => {
    describe('POST /api/cars/cars', () => {
        it('should create a new car listing', async () => {
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

            const response = await request(app).post('/api/cars/cars').send(newCar);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Car listing created successfully');
            expect(response.body.car).toBeDefined();
        });

        it('should return 400 if required fields are missing', async () => {
            const response = await request(app).post('/api/cars/cars').send({});

            expect(response.body.error).toBeDefined();
        });
    });

    describe('GET /api/cars/cars', () => {
        beforeEach(async () => {
            await Car.create({
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
        });

        it('should fetch cars with filters', async () => {
            const response = await request(app).get('/api/cars/cars').query({ make: 'Toyota' });

            expect(response.status).toBe(200);
            expect(response.body.data).toHaveLength(1);
            expect(response.body.data[0].make).toBe('Toyota');
        });

        it('should return 200 and an empty array if no cars match the filters', async () => {
            const response = await request(app).get('/api/cars/cars').query({ make: 'Ford' });

            expect(response.status).toBe(200);
            expect(response.body.data).toHaveLength(0);
        });

        it('should return 500 on server error', async () => {
            jest.spyOn(Car, 'find').mockImplementationOnce(() => {
                throw new Error('Database error');
            });

            const response = await request(app).get('/api/cars/cars');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Server error');
        });
    });

    describe('GET /api/cars/cars/:Id', () => {
        let carId: any;

        beforeEach(async () => {
            const car = await Car.create({
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
        });

        it('should return car details for a valid carId', async () => {
            const response = await request(app).get(`/api/cars/cars/${carId}`);

            expect(response.status).toBe(200);
            expect(response.body.data).toBeDefined();
        });

        it('should return 500 on server error', async () => {
            jest.spyOn(Car, 'findOne').mockImplementationOnce(() => {
                throw new Error('Database error');
            });

            const response = await request(app).get(`/api/cars/cars/${carId}`);

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Server error');
        });
    });
});