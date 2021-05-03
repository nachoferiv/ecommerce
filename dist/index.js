"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require('./db/mongoose');
var express_1 = __importDefault(require("express"));
var ProductsRouter_1 = require("./routers/ProductsRouter");
var ShoppingCartsRouter_1 = require("./routers/ShoppingCartsRouter");
var ChatMessagesRouter_1 = require("./routers/ChatMessagesRouter");
var port = Number(process.env.PORT) || 8080;
exports.app = express_1.default();
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({
    extended: false
}));
exports.app.get('/', function (req, res) {
    res.send('An alligator approaches!');
});
exports.app.use('/products', ProductsRouter_1.productsRouter);
exports.app.use('/shopping_cart', ShoppingCartsRouter_1.shoppingCartRouter);
exports.app.use('/chat_messages', ChatMessagesRouter_1.chatMessagesRouter);
exports.app.listen(port, function () {
    console.log("Server listening at port: " + port);
});
