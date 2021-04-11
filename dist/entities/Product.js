"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var Product = /** @class */ (function () {
    function Product(id, name, description, code, image, price, stock, timestamp) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.code = code;
        this.image = image;
        this.price = price;
        this.stock = stock;
        this.timestamp = timestamp;
    }
    return Product;
}());
exports.Product = Product;
