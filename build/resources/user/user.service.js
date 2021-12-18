"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_repository_1 = require("./user.repository");
const getAllUsers = async () => {
    const users = await user_repository_1.userRepo.getAllUsers();
    return users;
};
const getUserById = (id) => user_repository_1.userRepo.getUserById(id);
const createNewUser = (dto) => user_repository_1.userRepo.createNewUser(dto);
const updateUser = (dto, id) => user_repository_1.userRepo.updateUser(dto, id);
const deleteUser = (id) => user_repository_1.userRepo.deleteUser(id);
exports.userService = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
};
