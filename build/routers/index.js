"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = exports.userRouter = void 0;
const user_router_1 = require("./user.router");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return user_router_1.userRouter; } });
const auth_router_1 = require("./auth.router");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return auth_router_1.authRouter; } });
