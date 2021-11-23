import { LoadingStatuses } from './../../globalTypes';
import { Checklist } from './checklist.types';
import { RootState } from './../../store';

export const selectAllChecklists = (state: RootState): Checklist[] | null =>
  state.checklist.checklists;

export const selectSingleChecklist = (state: RootState): Checklist =>
  state.checklist.singleChecklist;

export const selectChecklistsStatus = (state: RootState): LoadingStatuses => state.checklist.status;

export const selectPostChecklistStatus = (state: RootState): LoadingStatuses =>
  state.checklist.postChecklistStatus;

export const selectSingleChecklistStatus = (state: RootState): LoadingStatuses =>
  state.checklist.singleChecklistStatus;
