import { LoadingStatuses } from './../../globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import { ChecklistState } from './checklist.types';

const initialState: ChecklistState = {
  checklists: null,
  status: LoadingStatuses.IDLE,
  singleChecklist: null,
  singleChecklistStatus: LoadingStatuses.IDLE,
  postChecklistStatus: LoadingStatuses.IDLE,
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
    postNewChecklist(state, action) {
      state.postChecklistStatus = LoadingStatuses.LOADING;
    },
    newChecklistPosted(state) {
      state.postChecklistStatus = LoadingStatuses.SUCCESS;
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
  postNewChecklist,
  newChecklistPosted,
} = checklistSlice.actions;

export const checklistReducer = checklistSlice.reducer;
