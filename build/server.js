"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
const db_1 = require("./db");
const users_router_1 = require("./resources/users.router");
const cors_1 = __importDefault(require("cors"));
dotenv_1.config();
exports.app = express_1.default();
exports.app.use(cors_1.default());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.static(path_1.default.join(__dirname, "../client/build")));
exports.app.use('/', (req, res, next) => {
    if (req.url === '/') {
        res.sendFile(path_1.default.join(__dirname, "../client/build", "index.html"));
        return;
    }
    next();
});
exports.app.use('/book', (req, res, next) => {
    if (req.url === '/') {
        res.sendFile(path_1.default.join(__dirname, "../client/build", "index.html"));
        return;
    }
    next();
});
exports.app.use('/reader', (req, res, next) => {
    if (req.url === '/') {
        res.sendFile(path_1.default.join(__dirname, "../client/build", "index.html"));
        return;
    }
    next();
});
exports.app.use('/api/words', users_router_1.wordsRouter);
(async () => {
    await db_1.TryDbConnect(() => exports.app.listen(process.env['PORT'], () => console.log('running')));
})();
