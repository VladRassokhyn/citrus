import {
  checklistReducer,
  getChecklists,
  postNewChecklist,
  newChecklistPosted,
  getSingleChecklist,
  categoryAdded,
  categoryRemoved,
  categoryTitleChanged,
  fieldAdded,
  fieldRemoved,
  fieldTitleChanged,
  checklistTitleChanged,
  fieldCheckedChanged,
  clearNewChecklist,
} from './checklist.slice';
import { Checklist, Category } from './checklist.types';
import {
  selectAllChecklists,
  selectChecklistsStatus,
  selectPostChecklistStatus,
  selectSingleChecklist,
  selectSingleChecklistStatus,
} from './checklist.selectors';
import { checklistWatcher } from './checklist.saga';

export type { Checklist, Category };
export const checklistSelectors = {
  selectAllChecklists,
  selectChecklistsStatus,
  selectPostChecklistStatus,
  selectSingleChecklist,
  selectSingleChecklistStatus,
};
export const checklistActions = {
  getChecklists,
  postNewChecklist,
  newChecklistPosted,
  getSingleChecklist,
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

export { checklistWatcher, checklistReducer };
