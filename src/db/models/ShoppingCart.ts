import mongoose, { Schema, Document } from 'mongoose'
import { ProductsSchema } from './Product';

const shoppingCartCollection = 'shopping_cart';

export interface IShoppingCart extends Document {
    timestamp: number;
    products: Array<typeof ProductsSchema>;
}

const ShoppingCartSchema = new Schema({
    timestamp: { type: Number, require: true },
    products: [ ProductsSchema ]
});



export const ShoppingCart = mongoose.model(shoppingCartCollection, ShoppingCartSchema);