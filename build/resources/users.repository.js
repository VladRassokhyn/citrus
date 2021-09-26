"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRepo = void 0;
const typeorm_1 = require("typeorm");
const User_model_1 = require("../entities/User.model");
const getAll = async () => {
    const wordsRepository = typeorm_1.getRepository(User_model_1.Word);
    return await wordsRepository.find();
};
const postWord = async (dto) => {
    const wordsRepository = typeorm_1.getRepository(User_model_1.Word);
    const word = wordsRepository.create(dto);
    return wordsRepository.save(word);
};
const deleteWord = async (id) => {
    const wordsRepository = typeorm_1.getRepository(User_model_1.Word);
    const word = await wordsRepository.findOne({ id });
    if (word) {
        return await wordsRepository.remove(word);
    }
    else {
        return null;
    }
};
const updateWord = async (dto) => {
    const wordsRepository = typeorm_1.getRepository(User_model_1.Word);
    const word = await wordsRepository.findOne({ id: dto.id });
    if (word) {
        return await wordsRepository.update(dto.id, dto);
    }
    else {
        return "NOT FOUND";
    }
};
exports.usersRepo = { postWord, deleteWord, getAll, updateWord };
