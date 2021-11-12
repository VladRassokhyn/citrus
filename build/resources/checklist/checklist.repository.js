"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checklistsRepo = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../../entities");
const getChecklists = async () => {
    const checklistRepo = (0, typeorm_1.getRepository)(entities_1.Checklist);
    return await checklistRepo.find({
        relations: ['categories', 'categories.fields'],
    });
};
const createNewChecklist = async (dto) => {
    const checklistRepo = (0, typeorm_1.getRepository)(entities_1.Checklist);
    const categoryRepo = (0, typeorm_1.getRepository)(entities_1.Category);
    const fieldRepo = (0, typeorm_1.getRepository)(entities_1.Field);
    const newChecklist = checklistRepo.create({ ...dto });
    const checklist = await checklistRepo.save(newChecklist);
    const categories = [];
    dto.categories.forEach(async (category) => {
        const newCategory = categoryRepo.create({ ...category, checklist });
        categories.push(newCategory);
    });
    const savedCategories = await categoryRepo.save(categories);
    const fields = [];
    savedCategories.forEach((category) => {
        category.fields.forEach((field) => {
            const newField = fieldRepo.create({ ...field, category });
            fields.push(newField);
        });
    });
    await fieldRepo.save(fields);
    return checklist.id;
};
const getChecklistById = async (id) => {
    const checklistRepo = (0, typeorm_1.getRepository)(entities_1.Checklist);
    return await checklistRepo.findOne({ id }, { relations: ['categories', 'categories.fields'] });
};
const deleteChecklist = async (deletorId, checklistId) => {
    const checklistRepo = (0, typeorm_1.getRepository)(entities_1.Checklist);
    const checklist = await checklistRepo.findOne({ id: checklistId });
    if (checklist && checklist.creatorId === deletorId) {
        return await checklistRepo.delete(checklistId);
    }
    else {
        return null;
    }
};
exports.checklistsRepo = {
    getChecklists,
    createNewChecklist,
    getChecklistById,
    deleteChecklist,
};
