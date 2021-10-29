import { LoadingStatuses } from './../../globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import { ChecklistState } from './checklist.types';

const initialState: ChecklistState = {
  checklists: null,
  status: LoadingStatuses.IDLE,
  singleChecklist: {
    title: '',
    passed: false,
    categories: [
      {
        title: '',
        fields: [
          {
            title: '',
            checked: false,
          },
        ],
      },
    ],
  },
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
    getSingleChecklist(state, action) {
      state.singleChecklistStatus = LoadingStatuses.LOADING;
    },
    setSingleChecklist(state, action) {
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
    checklistTitleChanged(state, action) {
      state.singleChecklist.title = action.payload;
    },
    categoryAdded(state) {
      state.singleChecklist.categories.push({
        title: '',
        fields: [{ title: '', checked: false }],
      });
    },
    categoryRemoved(state, action) {
      const index = action.payload;
      state.singleChecklist.categories.splice(index, 1);
    },
    categoryTitleChanged(state, action) {
      const index = action.payload.index;
      const title = action.payload.title;
      state.singleChecklist.categories[index].title = title;
    },
    fieldAdded(state, action) {
      const categoryIndex = action.payload;
      state.singleChecklist.categories[categoryIndex].fields.push({
        title: '',
        checked: false,
      });
    },
    fieldRemoved(state, action) {
      const categoryIndex = action.payload.categoryIndex;
      const fieldIndex = action.payload.fieldIndex;
      state.singleChecklist.categories[categoryIndex].fields.splice(
        fieldIndex,
        1,
      );
    },
    fieldTitleChanged(state, action) {
      const categoryIndex = action.payload.categoryIndex;
      const fieldIndex = action.payload.fieldIndex;
      const title = action.payload.title;
      state.singleChecklist.categories[categoryIndex].fields[
        fieldIndex
      ].title = title;
    },
    fieldCheckedChanged(state, action) {
      const categoryIndex = action.payload.categoryIndex;
      const fieldIndex = action.payload.fieldIndex;
      const field =
        state.singleChecklist.categories[categoryIndex].fields[fieldIndex];
      field.checked = !field.checked;
    },
  },
});

export const {
  getChecklists,
  setChecklists,
  getSingleChecklist,
  setSingleChecklist,
  setError,
  postNewChecklist,
  newChecklistPosted,
  categoryAdded,
  categoryRemoved,
  categoryTitleChanged,
  fieldAdded,
  fieldRemoved,
  fieldTitleChanged,
  checklistTitleChanged,
  fieldCheckedChanged,
} = checklistSlice.actions;

export const checklistReducer = checklistSlice.reducer;
