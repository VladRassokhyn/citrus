import { Action, LoadingStatuses } from '@lib/globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import { Checklist, ChecklistState } from '@lib/slices/checklist';

const newChecklist: Checklist = {
  id: 0,
  title: '',
  passed: false,
  managerId: 0,
  passerId: 0,
  mark: 0,
  maxMark: 0,
  creatorId: 0,
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
};

const initialState: ChecklistState = {
  checklists: null,
  status: LoadingStatuses.IDLE,
  singleChecklist: newChecklist,
};

const checklistSlice = createSlice({
  name: 'checklist',
  initialState,
  reducers: {
    getChecklists(state) {
      state.status = LoadingStatuses.LOADING;
    },
    setChecklists(state, action: Action<Checklist[]>) {
      state.checklists = action.payload;
      state.status = LoadingStatuses.SUCCESS;
    },
    getSingleChecklist(state, action: Action<string>) {
      state.status = LoadingStatuses.LOADING;
    },
    setSingleChecklist(state, action: Action<Checklist>) {
      state.singleChecklist = action.payload;
      state.status = LoadingStatuses.SUCCESS;
    },
    postNewChecklist(state, action: Action<Checklist>) {
      state.status = LoadingStatuses.LOADING;
    },
    newChecklistPosted(state) {
      state.status = LoadingStatuses.SUCCESS;
    },
    deleteChecklist(state, action: Action<number>) {
      state.status = LoadingStatuses.LOADING;
    },
    checklistDeleted(state) {
      state.status = LoadingStatuses.SUCCESS;
    },
    setError(state) {
      state.status = LoadingStatuses.ERROR;
    },
    checklistTitleChanged(state, action: Action<string>) {
      state.singleChecklist.title = action.payload;
    },
    categoryAdded(state) {
      state.singleChecklist.maxMark += 1;
      state.singleChecklist.categories.push({
        title: '',
        fields: [{ title: '', checked: false }],
      });
    },
    categoryRemoved(state, action: Action<number>) {
      const index = action.payload;
      state.singleChecklist.maxMark -= 1;
      state.singleChecklist.categories.splice(index, 1);
    },
    categoryTitleChanged(state, action: Action<{ index: number; title: string }>) {
      const index = action.payload.index;
      const title = action.payload.title;
      state.singleChecklist.categories[index].title = title;
    },
    fieldAdded(state, action: Action<number>) {
      const categoryIndex = action.payload;
      state.singleChecklist.maxMark += 1;
      state.singleChecklist.categories[categoryIndex].fields.push({
        title: '',
        checked: false,
      });
    },
    fieldRemoved(state, action: Action<{ categoryIndex: number; fieldIndex: number }>) {
      const categoryIndex = action.payload.categoryIndex;
      const fieldIndex = action.payload.fieldIndex;
      state.singleChecklist.maxMark -= 1;
      state.singleChecklist.categories[categoryIndex].fields.splice(fieldIndex, 1);
    },
    fieldTitleChanged(
      state,
      action: Action<{ categoryIndex: number; fieldIndex: number; title: string }>,
    ) {
      const categoryIndex = action.payload.categoryIndex;
      const fieldIndex = action.payload.fieldIndex;
      const title = action.payload.title;
      state.singleChecklist.categories[categoryIndex].fields[fieldIndex].title = title;
    },
    fieldCheckedChanged(state, action: Action<{ categoryIndex: number; fieldIndex: number }>) {
      const categoryIndex = action.payload.categoryIndex;
      const fieldIndex = action.payload.fieldIndex;
      const field = state.singleChecklist.categories[categoryIndex].fields[fieldIndex];
      field.checked = !field.checked;
    },
    clearNewChecklist(state) {
      state.singleChecklist = newChecklist;
      state.status = LoadingStatuses.IDLE;
    },
  },
});

export const {
  clearNewChecklist,
  getChecklists,
  setChecklists,
  deleteChecklist,
  checklistDeleted,
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
