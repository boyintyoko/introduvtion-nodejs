"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const db_1 = require("./config/db");
const server_2 = require("./server");
const root_1 = __importDefault(require("./routes/root"));
(0, server_2.bootServer)();
(0, db_1.dbConnection)();
server_1.default.use("/root", root_1.default);
