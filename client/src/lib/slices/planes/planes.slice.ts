import { LoadingStatuses } from './../../globalTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: LoadingStatuses.IDLE,
  updateStatus: LoadingStatuses.IDLE,
  planes: null,
};

const planesSlice = createSlice({
  name: 'planes',
  initialState,
  reducers: {
    getPlanes(state, action) {
      state.status = LoadingStatuses.LOADING;
    },
    setPlanes(state, action) {
      state.planes = action.payload;
      state.status = LoadingStatuses.SUCCESS;
    },
    setError(state) {
      state.status = LoadingStatuses.ERROR;
    },
  },
});

export const { getPlanes, setPlanes, setError } = planesSlice.actions;

export const planesReducer = planesSlice.reducer;
