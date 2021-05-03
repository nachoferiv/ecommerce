import mongoose, { Schema, Document } from 'mongoose'

const productsCollection = 'products';

export interface IProduct extends Document {
    email: string;
    description: string;
    code: string;
    image: string;
    price: number;
    stock: number;
    timestamp: number;
}

export const ProductsSchema = new Schema({
    email: { type: String, require: true, max: 100},
    description: { type: String, require: true, max: 255},
    code: { type: String, require: true, max: 20},
    image: { type: String, require: false, max: 100},
    price: { type: Number, require: true },
    stock: { type: Number, require: true },
    timestamp: { type: Number, require: true}
});

ProductsSchema.pre<IProduct>('save', function(next) {
    this.timestamp = Date.now();
    next();
});

export const Product = mongoose.model(productsCollection, ProductsSchema);