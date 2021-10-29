import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
};

const newChecklistSlice = createSlice({
  name: 'newChecklist',
  initialState,
  reducers: {
    checklistTitleChanged(state, action) {
      state.title = action.payload;
    },
    categoryAdded(state) {
      state.categories.push({
        title: '',
        fields: [{ title: '', checked: false }],
      });
    },
    categoryRemoved(state, action) {
      const index = action.payload;
      state.categories.splice(index, 1);
    },
    categoryTitleChanged(state, action) {
      const index = action.payload.index;
      const title = action.payload.title;
      state.categories[index].title = title;
    },
    fieldAdded(state, action) {
      const categoryIndex = action.payload;
      state.categories[categoryIndex].fields.push({
        title: '',
        checked: false,
      });
    },
    fieldRemoved(state, action) {
      const categoryIndex = action.payload.categoryIndex;
      const fieldIndex = action.payload.fieldIndex;
      state.categories[categoryIndex].fields.splice(fieldIndex, 1);
    },
    fieldTitleChanged(state, action) {
      const categoryIndex = action.payload.categoryIndex;
      const fieldIndex = action.payload.fieldIndex;
      const title = action.payload.title;
      state.categories[categoryIndex].fields[fieldIndex].title = title;
    },
  },
});

export const {
  categoryAdded,
  categoryRemoved,
  categoryTitleChanged,
  fieldAdded,
  fieldRemoved,
  fieldTitleChanged,
  checklistTitleChanged,
} = newChecklistSlice.actions;

export const newChecklistReducer = newChecklistSlice.reducer;
