"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = exports.app = void 0;
var express_1 = __importDefault(require("express"));
var ProductsRouter_1 = require("./routers/ProductsRouter");
var ShoppingCartsRouter_1 = require("./routers/ShoppingCartsRouter");
var port = Number(process.env.PORT) || 8080;
exports.app = express_1.default();
var isAdmin = false;
var isAuthorized = function (req, res, next) {
    if (!isAdmin) {
        res.status(401).json({ error: 'Not authorized for this action' });
        return;
    }
    next();
};
exports.isAuthorized = isAuthorized;
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({
    extended: false
}));
exports.app.get('/', function (req, res) {
    res.send('An alligator approaches!');
});
exports.app.use(ProductsRouter_1.productsRouter);
exports.app.use(ShoppingCartsRouter_1.shoppingCartRouter);
exports.app.listen(port, function () {
    console.log("Server listening at port: " + port);
});
