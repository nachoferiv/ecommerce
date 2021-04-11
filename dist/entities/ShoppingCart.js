"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingCart = void 0;
var ShoppingCart = /** @class */ (function () {
    function ShoppingCart(id, timestamp, products) {
        this.id = id;
        this.timestamp = timestamp;
        this.products = products;
    }
    return ShoppingCart;
}());
exports.ShoppingCart = ShoppingCart;
