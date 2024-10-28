import mongoose, { Schema, Document } from 'mongoose';

export interface ICar extends Document {
    make: string;
    carModel: string;
    year: number;
    mileage: number;
    price: number;
    description: string;
    seller: {
      name: string;
      email: string;
      phone: string;
    };
    images: string[];
    isSold: boolean;
  }
  
  const CarSchema: Schema = new Schema({
    make: { type: String, required: true },
    carModel: { type: String, required: true },
    year: { type: Number, required: true },
    mileage: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    seller: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true }
    },
    images: { type: [String], default: [] },
    isSold: { type: Boolean, default: false }
  });

export default mongoose.model<ICar>('Car', CarSchema);
