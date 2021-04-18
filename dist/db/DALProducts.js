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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DALProducts = void 0;
var knex_1 = __importDefault(require("knex"));
var knexOptions_1 = __importDefault(require("./knexOptions"));
var Product_1 = require("../entities/Product");
var DALProducts = /** @class */ (function () {
    function DALProducts() {
        var _this = this;
        this.read = function () { return __awaiter(_this, void 0, void 0, function () {
            var conn_1, products_1, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        conn_1 = knex_1.default(knexOptions_1.default);
                        products_1 = [];
                        return [4 /*yield*/, conn_1.from('products').select('*')
                                .then(function (rows) {
                                for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                                    var row = rows_1[_i];
                                    var product = new Product_1.Product(row['id'], row['name'], row['description'], row['code'], row['image'], row['price'], row['stock'], row['timestamp']);
                                    products_1.push(product);
                                }
                            })
                                .catch(function (err) {
                                console.log('Error trying to get products');
                                throw err;
                            })
                                .finally(function () {
                                conn_1.destroy();
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, products_1];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.save = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var currentTimestamp, row, conn_2, newProduct;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    currentTimestamp = new Date();
                    row = {
                        name: params.name,
                        description: params.description,
                        code: params.code,
                        image: params.image,
                        price: params.price,
                        stock: params.stock,
                        timestamp: currentTimestamp
                    };
                    conn_2 = knex_1.default(knexOptions_1.default);
                    newProduct = conn_2('products').insert(row)
                        .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                        var id, rows, _i, rows_2, row_1, product;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    id = result[0];
                                    return [4 /*yield*/, conn_2.from('products').select('*').where('id', '=', id)];
                                case 1:
                                    rows = _a.sent();
                                    for (_i = 0, rows_2 = rows; _i < rows_2.length; _i++) {
                                        row_1 = rows_2[_i];
                                        product = new Product_1.Product(row_1['id'], row_1['name'], row_1['description'], row_1['code'], row_1['image'], row_1['price'], row_1['stock'], row_1['timestamp']);
                                        return [2 /*return*/, product];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })
                        .catch(function (err) { return console.log(err); })
                        .finally(function () { return conn_2.destroy(); });
                    return [2 /*return*/, newProduct];
                }
                catch (e) {
                    console.log(e.message);
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        }); };
        this.update = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var currentTimestamp, conn_3, product, e_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        currentTimestamp = new Date();
                        conn_3 = knex_1.default(knexOptions_1.default);
                        return [4 /*yield*/, conn_3.from('products').where('id', '=', params.id).update({
                                name: params.name,
                                description: params.description,
                                image: params.image,
                                price: params.price,
                                stock: params.stock,
                                timestamp: currentTimestamp
                            })
                                .then(function () { return __awaiter(_this, void 0, void 0, function () {
                                var rows, _i, rows_3, row, product_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, conn_3.from('products').select('*').where('id', '=', params.id)];
                                        case 1:
                                            rows = _a.sent();
                                            for (_i = 0, rows_3 = rows; _i < rows_3.length; _i++) {
                                                row = rows_3[_i];
                                                product_1 = new Product_1.Product(row['id'], row['name'], row['description'], row['code'], row['image'], row['price'], row['stock'], row['timestamp']);
                                                return [2 /*return*/, product_1];
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); })
                                .catch(function (err) {
                                console.log(err);
                                return null;
                            })
                                .finally(function () { return conn_3.destroy(); })];
                    case 1:
                        product = _a.sent();
                        return [2 /*return*/, product];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.delete = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var conn_4, isDeleted, e_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        conn_4 = knex_1.default(knexOptions_1.default);
                        return [4 /*yield*/, conn_4.from('products').where('id', '=', id).delete()
                                .then(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, true];
                            }); }); })
                                .catch(function (err) {
                                console.log(err);
                                return false;
                            })
                                .finally(function () { return conn_4.destroy(); })];
                    case 1:
                        isDeleted = _a.sent();
                        return [2 /*return*/, isDeleted];
                    case 2:
                        e_3 = _a.sent();
                        console.log(e_3);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        var conn = knex_1.default(knexOptions_1.default);
        conn.schema.hasTable('products').then(function (exists) {
            if (!exists) {
                conn.schema.createTable('products', function (table) {
                    table.increments('id').notNullable().primary();
                    table.string('name').notNullable();
                    table.string('description').notNullable();
                    table.string('code').notNullable().unique();
                    table.string('image').notNullable();
                    table.decimal('price').notNullable().unsigned();
                    table.integer('stock').notNullable().unsigned();
                    table.timestamp('timestamp').notNullable();
                })
                    .then(function () { console.log('OK'); })
                    .catch(function (err) {
                    console.log('Error creating products table');
                    throw err;
                });
            }
        })
            .finally(function () {
            conn.destroy();
        });
    }
    return DALProducts;
}());
exports.DALProducts = DALProducts;
