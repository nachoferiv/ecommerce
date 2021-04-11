export class Product {
    id: number;
    name: string;
    description: string;
    code: string;
    image: string;
    price: number;
    stock: number;
    timestamp: number;

    constructor(id: number, name: string, description: string, code: string, image: string, price: number, stock: number, timestamp: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.code = code;
        this.image = image;
        this.price = price;
        this.stock = stock;
        this.timestamp = timestamp;
    }
}