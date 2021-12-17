import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatuses } from './../../globalTypes';

const initialState = {
  status: LoadingStatuses,
  todos: null,
};

const todoSlide = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
});

export const todoReducer = todoSlide.reducer;
