import { Request, Response } from 'express';
import Car, { ICar } from '../models/car.model';

// Define a type for sortable fields
type SortableFields = keyof ICar;

// Add a new car listing
export const addCar = async (req: Request, res: Response) => {
    try {
      const { make, carModel, year, mileage, price, description, seller, isSold } = req.body;
  
      // Type assertion to ensure req.files is treated as an array of files
      const images = req.files ? (req.files as Express.Multer.File[]).map((file) => file.path) : [];
  
      const newCar = new Car({ make, carModel, year, mileage, price, description, seller, images, isSold });
      await newCar.save();
  
      res.status(201).json({ message: 'Car listing created successfully', car: newCar._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };


// Search and filter cars
export const getCars = async (req: Request, res: Response) => {
    try {
        // Build the filter object based on query parameters
        const {
            make,
            carModel,
            yearMin,
            yearMax,
            priceMin,
            priceMax,
            mileageMin,
            mileageMax,
            sortBy,
            order,
        } = req.query;

        const filters: any = {};

        // Add filters based on the query parameters
        if (make) filters.make = make;
        if (carModel) filters.carModel = carModel;
        if (yearMin || yearMax) {
            filters.year = {};
            if (yearMin) filters.year.$gte = Number(yearMin);
            if (yearMax) filters.year.$lte = Number(yearMax);
        }
        if (priceMin || priceMax) {
            filters.price = {};
            if (priceMin) filters.price.$gte = Number(priceMin);
            if (priceMax) filters.price.$lte = Number(priceMax);
        }
        if (mileageMin || mileageMax) {
            filters.mileage = {};
            if (mileageMin) filters.mileage.$gte = Number(mileageMin);
            if (mileageMax) filters.mileage.$lte = Number(mileageMax);
        }

        // Fetch cars with filters
        const cars: ICar[] = await Car.find(filters).select('make carModel year price images');

        // Sort results if sortBy is provided and is a valid key
        if (sortBy && typeof sortBy === 'string' && (sortBy as SortableFields) in cars[0]) {
            const sortOrder = order === 'desc' ? -1 : 1;

            // Sort cars based on the specified field
            cars.sort((a: ICar, b: ICar) => {
                if (a[sortBy as SortableFields] > b[sortBy as SortableFields]) {
                    return sortOrder;
                } else if (a[sortBy as SortableFields] < b[sortBy as SortableFields]) {
                    return -sortOrder;
                } else {
                    return 0;
                }
            });
        }

        res.status(200).json({data: cars});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


// Search and filter cars
export const getCarDetails = async (req: Request, res: Response) => {
    try {
        // Build the filter object based on query parameters
        const { carId } = req.query;

        const car = await Car.findOne({ _id: carId });
        

        res.status(200).json({data: car});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};