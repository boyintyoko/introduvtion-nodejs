"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mysql2_1 = __importDefault(require("mysql2"));
dotenv_1.default.config();
const dbConnection = () => {
    const connection = mysql2_1.default.createConnection({
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    });
    connection.connect((err) => {
        if (err) {
            console.log(`MySQLへの接続が失敗しました: ${err}`);
            return;
        }
        console.log("MySQLに接続しました");
    });
};
exports.dbConnection = dbConnection;
