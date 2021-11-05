import { Checklist } from '../../entities';
import { checklistsRepo } from './checklist.repository';
import { QueryParams } from './checklist.types';

const getChecklists = async (params: QueryParams) => {
  let checklists = await checklistsRepo.getChecklists();

  if (params.passedOnly) {
    checklists = checklists.filter((checklist) => checklist.passed);
  } else {
    checklists = checklists.filter((checklist) => !checklist.passed);
  }

  if (params.passerId) {
    checklists = checklists.filter(
      (checklist) => checklist.passerId === Number(params.passerId),
    );
  }

  return checklists;
};

const createNewChecklist = async (dto: Checklist) =>
  checklistsRepo.createNewChecklist(dto);

const getChecklistById = (id: number) => checklistsRepo.getChecklistById(id);

const deleteChecklist = (id: number) => checklistsRepo.deleteChecklist(id);

export const checklistService = {
  getChecklists,
  createNewChecklist,
  getChecklistById,
  deleteChecklist,
};
