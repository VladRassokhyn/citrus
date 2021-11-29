import { Action, LoadingStatuses } from './../../globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import { GetPlanesPayload, Planes } from './planes.type';

const initialState = {
  status: LoadingStatuses.IDLE,
  updateStatus: LoadingStatuses.IDLE,
  planes: {
    tt: { label: '', value: '' },
    cm: 0,
    cz: 0,
    ca: 0,
    to_cm: 0,
    to_cz: 0,
    mounth: new Date().getMonth(),
    year: new Date().getFullYear(),
  },
};

const planesSlice = createSlice({
  name: 'planes',
  initialState,
  reducers: {
    getPlanes(state, action: Action<GetPlanesPayload>) {
      state.status = LoadingStatuses.LOADING;
    },
    setPlanes(state, action: Action<Planes>) {
      state.planes = action.payload;
      state.status = LoadingStatuses.SUCCESS;
    },
    updatePlanes(state, action: Action<{ planes: Planes; tt: string }>) {
      state.updateStatus = LoadingStatuses.LOADING;
    },
    planesUpdated(state) {
      state.updateStatus = LoadingStatuses.SUCCESS;
    },
    postPlanes(state, action: Action<{ planes: Planes; tt: string }>) {
      state.updateStatus = LoadingStatuses.LOADING;
    },
    planesPosted(state) {
      state.updateStatus = LoadingStatuses.SUCCESS;
    },
    setError(state) {
      state.status = LoadingStatuses.ERROR;
    },
  },
});

export const {
  postPlanes,
  planesPosted,
  planesUpdated,
  updatePlanes,
  getPlanes,
  setPlanes,
  setError,
} = planesSlice.actions;

export const planesReducer = planesSlice.reducer;
