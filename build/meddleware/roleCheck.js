"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
const checkRole = (roles) => {
    return async (req, res, next) => {
        const id = res.locals['jwtPayload'].userId;
        const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
        try {
            const user = await userRepository.findOneOrFail(id);
            if (roles.indexOf(user.role) > -1) {
                next();
            }
            else {
                res.status(401).send();
            }
        }
        catch (id) {
            res.status(401).send();
        }
    };
};
exports.checkRole = checkRole;
