"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = exports.checkJwt = void 0;
const jwtCheck_1 = require("./jwtCheck");
Object.defineProperty(exports, "checkJwt", { enumerable: true, get: function () { return jwtCheck_1.checkJwt; } });
const roleCheck_1 = require("./roleCheck");
Object.defineProperty(exports, "checkRole", { enumerable: true, get: function () { return roleCheck_1.checkRole; } });
