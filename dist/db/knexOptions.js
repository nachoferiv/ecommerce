"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var options = {
    client: 'sqlite3',
    connection: {
        //host: process.env.DB_URL,
        //user: process.env.DB_USER,
        //password: process.env.DB_PASSWORD,
        //database: process.env.DB_NAME
        filename: path_1.default.join(__dirname, './sql_storage/ecommerce.sqlite')
    },
    useNullAsDefault: true
};
exports.default = options;
