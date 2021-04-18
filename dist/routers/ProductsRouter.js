"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
var express_1 = __importDefault(require("express"));
var ProductController_1 = require("../controllers/ProductController");
var Auth_1 = require("../middlewares/Auth");
exports.productsRouter = express_1.default.Router();
var productsController = new ProductController_1.ProductsController();
exports.productsRouter.get('/:id?', productsController.get);
exports.productsRouter.post('', Auth_1.isAuthorized, productsController.create);
exports.productsRouter.put('/:id', Auth_1.isAuthorized, productsController.update);
exports.productsRouter.delete('/:id', Auth_1.isAuthorized, productsController.delete);
