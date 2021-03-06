"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = exports.salesRouter = exports.salesmanRouter = exports.planesRouter = exports.userRouter = exports.checklistRouter = exports.authRouter = void 0;
const auth_1 = require("./auth");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return auth_1.authRouter; } });
const checklist_1 = require("./checklist");
Object.defineProperty(exports, "checklistRouter", { enumerable: true, get: function () { return checklist_1.checklistRouter; } });
const user_1 = require("./user");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return user_1.userRouter; } });
const planes_1 = require("./planes");
Object.defineProperty(exports, "planesRouter", { enumerable: true, get: function () { return planes_1.planesRouter; } });
const salesman_1 = require("./salesman");
Object.defineProperty(exports, "salesmanRouter", { enumerable: true, get: function () { return salesman_1.salesmanRouter; } });
const sales_1 = require("./sales");
Object.defineProperty(exports, "salesRouter", { enumerable: true, get: function () { return sales_1.salesRouter; } });
const todo_1 = require("./todo");
Object.defineProperty(exports, "todoRouter", { enumerable: true, get: function () { return todo_1.todoRouter; } });
