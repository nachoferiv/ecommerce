"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shoppingCartRouter = void 0;
var express_1 = __importDefault(require("express"));
var ShoppingCartController_1 = require("../controllers/ShoppingCartController");
var Auth_1 = require("../middlewares/Auth");
exports.shoppingCartRouter = express_1.default.Router();
var shoppingCartController = new ShoppingCartController_1.ShoppingCartsController();
exports.shoppingCartRouter.get('/:id?', shoppingCartController.get);
exports.shoppingCartRouter.post('', Auth_1.isAuthorized, shoppingCartController.create);
exports.shoppingCartRouter.delete('/:id', Auth_1.isAuthorized, shoppingCartController.delete);
