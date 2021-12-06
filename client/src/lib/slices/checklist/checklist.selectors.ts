import { LoadingStatuses } from './../../globalTypes';
import { Checklist } from './checklist.types';
import { RootState } from './../../store';

export const checklists = (state: RootState): Checklist[] | null => state.checklist.checklists;

export const singleChecklist = (state: RootState): Checklist => state.checklist.singleChecklist;

export const status = (state: RootState): LoadingStatuses => state.checklist.status;
