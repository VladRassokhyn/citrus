"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const daySales_router_1 = require("./resources/daySales/daySales.router");
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const resources_1 = require("./resources");
(0, dotenv_1.config)();
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.static(path_1.default.join(__dirname, '../client/build')));
const rootUrls = ['/', '/users', '/cm', '/analytics', '/checklist', '/login'];
exports.app.use('/', (req, res, next) => {
    if (rootUrls.includes(req.url)) {
        res.sendFile(path_1.default.join(__dirname, '../client/build', 'index.html'));
        return;
    }
    next();
});
exports.app.use('/api/auth', resources_1.authRouter);
exports.app.use('/api/users', resources_1.userRouter);
exports.app.use('/api/checklist', resources_1.checklistRouter);
exports.app.use('/api/planes', resources_1.planesRouter);
exports.app.use('/api/day-sales', daySales_router_1.daySalesRouter);
(async () => {
    await (0, db_1.TryDbConnect)(() => exports.app.listen(process.env['PORT'], () => console.log('running' + process.env['PORT'])));
})();
