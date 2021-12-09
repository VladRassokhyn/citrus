"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepo = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const entities_1 = require("../../entities");
const getAllUsers = async () => {
    const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
    return await userRepository.find({
        select: ['id', 'username', 'role', 'name', 'lastName', 'shop'],
        relations: ['shop'],
    });
};
const getUserById = async (id) => {
    const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
    return await userRepository.findOneOrFail(id, {
        select: ['id', 'name', 'lastName', 'username', 'role', 'shop'],
        relations: ['shop'],
    });
};
const createNewUser = async (dto) => {
    const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
    const user = userRepository.create(dto);
    const errors = await (0, class_validator_1.validate)(user);
    if (errors.length > 0) {
        return errors;
    }
    user.hashPassword();
    return await userRepository.save(user);
};
const updateUser = async (dto, id) => {
    const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
    try {
        return await userRepository.update(id, dto);
    }
    catch (err) {
        return err;
    }
};
const deleteUser = async (id) => {
    const userRepository = (0, typeorm_1.getRepository)(entities_1.User);
    return await userRepository.delete(id);
};
exports.userRepo = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
};
