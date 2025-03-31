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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.session = void 0;
const express_1 = require("express");
const db_1 = require("../config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = (0, express_1.Router)();
exports.session = router;
const connection = (0, db_1.dbConnection)();
router.post("/create/account", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    if (!name || !password) {
        return res
            .status(400)
            .json({ message: "ユーザーネームまたはパスワードがありません" });
    }
    try {
        const existingUser = yield checkUser(name);
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "そのユーザーはすでに存在します" });
        }
        const hashedPassword = yield hashPassword(password);
        const query = "INSERT INTO users (name, password) VALUES (?, ?)";
        connection.query(query, [name, hashedPassword], (err, result) => {
            if (err) {
                console.log(`ユーザー作成時にエラーが発生しました: ${err}`);
                return res
                    .status(500)
                    .json({ message: "ユーザー作成時にエラーが発生しました" });
            }
            return res.status(201).json({
                message: "ユーザーが作成されました",
                user: result,
            });
        });
    }
    catch (error) {
        console.log("エラーが発生しました", error);
        return res.status(500).json({ message: "エラーが発生しました" });
    }
}));
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        return hashedPassword;
    }
    catch (_a) {
        throw new Error("パスワードハッシュ時にエラーが発生しました");
    }
});
const checkUser = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE name = ?";
        connection.query(query, [name], (err, results) => {
            if (err) {
                console.log(`ユーザー確認中にエラーが発生しました: ${err}`);
                reject(err);
            }
            else {
                resolve(results.length > 0 ? results[0] : null);
            }
        });
    });
});
