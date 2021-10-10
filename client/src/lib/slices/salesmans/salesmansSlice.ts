import { Salesman } from '../../types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Salesman[] = [];

const salesmansSlice = createSlice({
  name: 'salesmans',
  initialState,
  reducers: {},
});

export const salesmansReducer = salesmansSlice.reducer;
