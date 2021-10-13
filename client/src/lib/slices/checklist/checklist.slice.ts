import { menus } from './../../../pages/CM/menus';
import { createSlice } from '@reduxjs/toolkit';
import { ChecklistInitialState } from './checklist.types';

const initialState: ChecklistInitialState = {
  checklists: [],
  newChecklist: null,
};

const checklistSlice = createSlice({
  name: 'checklist',
  initialState,
  reducers: {},
});

export const {} = checklistSlice.actions;

export const checklistReducer = checklistSlice.reducer;
