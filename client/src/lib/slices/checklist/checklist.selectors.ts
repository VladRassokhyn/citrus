import { RootState } from './../../store';

export const selectAllChecklists = (state: RootState) =>
  state.checklist.checklists;

export const selectChecklistsStatus = (state: RootState) =>
  state.checklist.status;

export const selectPostChecklistStatus = (state: RootState) =>
  state.checklist.postChecklistStatus;

export const selectSingleChecklist = (state: RootState) =>
  state.checklist.singleChecklist;

export const selectSingleChecklistStatus = (state: RootState) =>
  state.checklist.singleChecklistStatus;
