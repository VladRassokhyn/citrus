import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatuses } from '../../globalTypes';
import { ChecklistState } from './checklist.types';

const initialState: ChecklistState = {
  checklists: null,
  status: LoadingStatuses.IDLE,
  singleChecklist: null,
  singleChecklistStatus: LoadingStatuses.IDLE,
};

const checklistSlice = createSlice({
  name: 'checklist',
  initialState,
  reducers: {
    getChecklists(state) {
      state.status = LoadingStatuses.LOADING;
    },
    setChecklists(state, action) {
      state.checklists = action.payload;
      state.status = LoadingStatuses.SUCCESS;
    },
    getSingleChecklist(state) {
      state.singleChecklistStatus = LoadingStatuses.LOADING;
    },
    setSingleChecklistStatus(state, action) {
      state.singleChecklist = action.payload;
      state.singleChecklistStatus = LoadingStatuses.SUCCESS;
    },
    setError(state) {
      state.status = LoadingStatuses.ERROR;
    },
  },
});

export const {
  getChecklists,
  setChecklists,
  getSingleChecklist,
  setSingleChecklistStatus,
  setError,
} = checklistSlice.actions;

export const checklistReducer = checklistSlice.reducer;
