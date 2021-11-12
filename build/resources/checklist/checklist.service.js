"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checklistService = void 0;
const checklist_repository_1 = require("./checklist.repository");
const getChecklists = async (params) => {
    let checklists = await checklist_repository_1.checklistsRepo.getChecklists();
    if (params.passedOnly) {
        checklists = checklists.filter((checklist) => checklist.passed);
    }
    else {
        checklists = checklists.filter((checklist) => !checklist.passed);
    }
    if (params.passerId) {
        checklists = checklists.filter((checklist) => checklist.passerId === Number(params.passerId));
    }
    return checklists;
};
const createNewChecklist = async (dto) => checklist_repository_1.checklistsRepo.createNewChecklist(dto);
const getChecklistById = (id) => checklist_repository_1.checklistsRepo.getChecklistById(id);
const deleteChecklist = (deletorId, checklistId) => checklist_repository_1.checklistsRepo.deleteChecklist(deletorId, checklistId);
exports.checklistService = {
    getChecklists,
    createNewChecklist,
    getChecklistById,
    deleteChecklist,
};
