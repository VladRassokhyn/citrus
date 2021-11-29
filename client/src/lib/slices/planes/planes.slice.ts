import { Action, LoadingStatuses } from './../../globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import { Planes } from './planes.type';

const initialState = {
  status: LoadingStatuses.IDLE,
  updateStatus: LoadingStatuses.IDLE,
  planes: {
    id: 0,
    tt: { label: '', value: '' },
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
    getPlanes(state, action: Action<string>) {
      state.status = LoadingStatuses.LOADING;
    },
    setPlanes(state, action: Action<Planes>) {
      state.planes = action.payload;
      state.status = LoadingStatuses.SUCCESS;
    },
    updatePlanes(state, action: Action<Planes>) {
      state.updateStatus = LoadingStatuses.LOADING;
    },
    planesUpdated(state) {
      state.updateStatus = LoadingStatuses.SUCCESS;
    },
    setError(state) {
      state.status = LoadingStatuses.ERROR;
    },
  },
});

export const { planesUpdated, updatePlanes, getPlanes, setPlanes, setError } = planesSlice.actions;

export const planesReducer = planesSlice.reducer;
