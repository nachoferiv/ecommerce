"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.ProductsSchema = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var productsCollection = 'products';
exports.ProductsSchema = new mongoose_1.Schema({
    email: { type: String, require: true, max: 100 },
    description: { type: String, require: true, max: 255 },
    code: { type: String, require: true, max: 20 },
    image: { type: String, require: false, max: 100 },
    price: { type: Number, require: true },
    stock: { type: Number, require: true },
    timestamp: { type: Number, require: true }
});
exports.ProductsSchema.pre('save', function (next) {
    this.timestamp = Date.now();
    next();
});
exports.Product = mongoose_1.default.model(productsCollection, exports.ProductsSchema);
