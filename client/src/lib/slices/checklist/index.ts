export { checklistsApi } from './checklist.api';
import { checklists, status, singleChecklist } from './checklist.selectors';
import {
  checklistReducer,
  setChecklists,
  getChecklists,
  postNewChecklist,
  newChecklistPosted,
  getSingleChecklist,
  categoryAdded,
  setError,
  categoryRemoved,
  categoryTitleChanged,
  fieldAdded,
  fieldRemoved,
  fieldTitleChanged,
  checklistTitleChanged,
  fieldCheckedChanged,
  clearNewChecklist,
  setSingleChecklist,
  checklistDeleted,
  deleteChecklist,
} from './checklist.slice';

export const checklistSelectors = {
  checklists,
  status,
  singleChecklist,
};
export const checklistActions = {
  getChecklists,
  postNewChecklist,
  newChecklistPosted,
  getSingleChecklist,
  setSingleChecklist,
  setChecklists,
  setError,
  checklistDeleted,
  deleteChecklist,
};
export const checklistEditActions = {
  categoryAdded,
  categoryRemoved,
  categoryTitleChanged,
  fieldAdded,
  fieldRemoved,
  fieldTitleChanged,
  checklistTitleChanged,
  fieldCheckedChanged,
  clearNewChecklist,
};

export type { Checklist, Category, ChecklistState } from './checklist.types';
export { checklistWatcher } from './checklist.saga';
export { checklistReducer };
