"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
var Product_1 = require("../entities/Product");
var DALProducts_1 = require("../db/DALProducts");
var ProductsController = /** @class */ (function () {
    function ProductsController() {
        var _this = this;
        this.db = new DALProducts_1.DALProducts();
        this.get = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var productId_1, allProducts, product, products, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        productId_1 = Number(req.params.id);
                        if (!productId_1) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.db.read()];
                    case 1:
                        allProducts = _a.sent();
                        product = allProducts.filter(function (p) { return p.id === productId_1; })[0];
                        if (!product) {
                            res.status(404).json({ description: 'Resource not found' });
                            return [2 /*return*/];
                        }
                        res.status(200).send(product);
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, this.db.read()];
                    case 3:
                        products = _a.sent();
                        res.status(200).json(products);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        res.status(500).json({ error: 0, description: 'Whoops! Something went wrong...;' });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.create = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var createdProduct, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!req.body.name || !req.body.description || !req.body.code || !req.body.image || !req.body.price || !req.body.stock) {
                            res.status(400).json({ error: 2, description: 'Few parameters were provided. The product can not be created.' });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.db.save(req.body)];
                    case 1:
                        createdProduct = _a.sent();
                        console.log(createdProduct);
                        if (!createdProduct) {
                            res.status(400).json({ error: 3, description: 'Something went wrong...' });
                            return [2 /*return*/];
                        }
                        res.status(200).json(createdProduct);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1.message);
                        res.status(500).json({ error: 1, description: 'Something went wrong...' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.update = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var productId, product, status, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        productId = Number(req.params.id);
                        if (!productId) {
                            res.status(400).json({ error: 2, description: 'Product id must be provided.' });
                            return [2 /*return*/];
                        }
                        if (!req.body.name || !req.body.description || !req.body.code || !req.body.image || !req.body.price || !req.body.stock) {
                            res.status(400).json({ error: 2, description: 'Few parameters were provided. The product can not be created.' });
                            return [2 /*return*/];
                        }
                        product = new Product_1.Product(Number(req.params.id), req.body.name, req.body.description, req.body.code, req.body.image, req.body.price, req.body.stock, req.body.timestamp);
                        return [4 /*yield*/, this.db.update(product)];
                    case 1:
                        status = _a.sent();
                        if (!status) {
                            res.status(400).json({ error: 'The product does not exist' });
                            return [2 /*return*/];
                        }
                        else {
                            res.status(200).json({ message: 'updated', product: status });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        res.status(400).json({ error: "Whoops! Something went wrong..." });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.delete = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var productId, isDeleted, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        productId = Number(req.params.id);
                        if (!productId) {
                            res.status(400).json({ error: 'Few parameters were provided. The product can not be deleted' });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.db.delete(productId)];
                    case 1:
                        isDeleted = _a.sent();
                        if (!isDeleted) {
                            res.status(400).json({ error: 'The product does not exist' });
                            return [2 /*return*/];
                        }
                        else {
                            res.status(200).json({ message: 'deleted' });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        console.log(e_3);
                        res.status(400).json({ error: "Whoops! Something went wrong..." });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return ProductsController;
}());
exports.ProductsController = ProductsController;
