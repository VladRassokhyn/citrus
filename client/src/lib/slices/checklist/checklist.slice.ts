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
  reducers: {
    newChecklistAdded(state, action) {
      const menu = menus.find((menu) => menu.id === action.payload);
      if (menu) {
        const themes = menu.os.map((os) => {
          return {
            id: os.id,
            title: os.displayName,
            subThemes: os.items.map((item) => {
              return {
                id: item.id,
                title: item.displayName,
                fields: item.includes!.map((inc) => {
                  return {
                    id: inc.id,
                    title: inc.title,
                    checkbox: false,
                  };
                }),
              };
            }),
          };
        });
        state.newChecklist = {
          name: menu.title,
          salesmanId: action.payload,
          themes: themes,
        };
      }
    },
    fieldCheckboxChanged(state, action) {
      const field = state
        .newChecklist!.themes.find(
          (theme) => theme.id === action.payload.themeId,
        )
        ?.subThemes?.find(
          (subTheme) => subTheme.id === action.payload.subThemeId,
        )
        ?.fields.find((field) => field.id === action.payload.fieldId);
      if (field) {
        field.checkbox = !field.checkbox;
      }
    },
  },
});

export const {
  newChecklistAdded,
  fieldCheckboxChanged,
} = checklistSlice.actions;

export const checklistReducer = checklistSlice.reducer;
