import { RootState } from './../../store';

export const selectAllChecklists = (state: RootState) =>
  state.checklist.checklists;

export const selectChecklistsStatus = (state: RootState) =>
  state.checklist.status;
