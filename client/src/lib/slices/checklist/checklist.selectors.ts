import { RootState } from './../../store';

export const selectNewChecklist = (state: RootState) =>
  state.checklist.newChecklist;
