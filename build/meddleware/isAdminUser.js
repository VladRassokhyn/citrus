"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminUser = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
const isAdminUser = async (req, res, next) => {
    const id = res.locals['jwtPayload'].userId;
    const userRepo = (0, typeorm_1.getRepository)(entities_1.User);
    const user = await userRepo.findOneOrFail(id);
    res.locals['isAdminUser'] = user.role === 'ADMIN';
    next();
};
exports.isAdminUser = isAdminUser;
