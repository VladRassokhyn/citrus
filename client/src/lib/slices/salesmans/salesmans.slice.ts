import { LoadingStatuses, SalesmanState } from '../../types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: SalesmanState = {
  items: [],
  status: LoadingStatuses.IDLE,
  error: null,
};

const salesmansSlice = createSlice({
  name: 'salesmans',
  initialState,
  reducers: {
    getSalesmans(state) {
      state.status = LoadingStatuses.LOADING;
    },
    setSalesmans(state, action) {
      state.items = action.payload;
      state.status = LoadingStatuses.SUCCESS;
    },
    setError(state, action) {
      state.status = LoadingStatuses.ERROR;
      state.error = action.payload;
    },
  },
});

export const { getSalesmans, setSalesmans, setError } = salesmansSlice.actions;

export const salesmansReducer = salesmansSlice.reducer;
