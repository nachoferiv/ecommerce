import { Product } from './Product';

export class ShoppingCart {
    id: number;
    timestamp: number;
    products: Array<Product>;

    constructor(id: number, timestamp: number, products: Array<Product>) {
        this.id = id;
        this.timestamp = timestamp;
        this.products = products;
    }
}