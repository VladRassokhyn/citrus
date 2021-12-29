import { LoadingStatuses } from '@lib/globalTypes';
import { Checklist } from '@lib/slices/checklist';
import { RootState } from '@lib/store';

export const checklists = (state: RootState): Checklist[] | null => state.checklist.checklists;

export const singleChecklist = (state: RootState): Checklist => state.checklist.singleChecklist;

export const status = (state: RootState): LoadingStatuses => state.checklist.status;
