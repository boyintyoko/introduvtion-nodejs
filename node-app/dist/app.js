"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const db_1 = require("./config/db");
const server_2 = require("./server");
const session_1 = require("./routes/session");
(0, server_2.bootServer)();
(0, db_1.dbConnection)();
server_1.default.use("/session", session_1.session);
