"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSalesman = exports.removeSalesman = exports.addSalesman = exports.getAllSalesmans = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
const getAllSalesmans = async () => {
    try {
        const repo = (0, typeorm_1.getRepository)(entities_1.Salesman);
        return await repo.find();
    }
    catch (err) {
        console.error('get all salesmans error');
        return err;
    }
};
exports.getAllSalesmans = getAllSalesmans;
const addSalesman = async (dto) => {
    const repo = (0, typeorm_1.getRepository)(entities_1.Salesman);
    const newSalesman = await repo.create(dto);
    return await repo.save(newSalesman);
};
exports.addSalesman = addSalesman;
const updateSalesman = async (dto) => {
    try {
        const repo = (0, typeorm_1.getRepository)(entities_1.Salesman);
        return await repo.update(dto.id, dto);
    }
    catch (err) {
        return err;
    }
};
exports.updateSalesman = updateSalesman;
const removeSalesman = async (salesmanId) => {
    try {
        const repo = (0, typeorm_1.getRepository)(entities_1.Salesman);
        const salesman = await repo.find({ id: salesmanId });
        return repo.delete(salesman[0]);
    }
    catch (err) {
        return err;
    }
};
exports.removeSalesman = removeSalesman;
