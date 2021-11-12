import { LoadingStatuses } from './../../globalTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: LoadingStatuses.IDLE,
  updateStatus: LoadingStatuses.IDLE,
  planes: {
    cm: 0,
    cz: 0,
    ca: 0,
    to_cm: 0,
    to_cz: 0,
  },
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
    updatePlanes(state, action) {
      state.updateStatus = LoadingStatuses.LOADING;
    },
    planesUpdated(state, action) {
      state.updateStatus = LoadingStatuses.SUCCESS;
    },
    setError(state) {
      state.status = LoadingStatuses.ERROR;
    },
  },
});

export const {
  planesUpdated,
  updatePlanes,
  getPlanes,
  setPlanes,
  setError,
} = planesSlice.actions;

export const planesReducer = planesSlice.reducer;
