import { LoadingStatuses } from './../../globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import { DaySalesState } from './daySales.type';

const initialState: DaySalesState = {
  getStatus: LoadingStatuses.IDLE,
  postStatus: LoadingStatuses.IDLE,
  updateStatus: LoadingStatuses.IDLE,
  sales: null,
};

const daySalesSlice = createSlice({
  name: 'daySales',
  initialState,
  reducers: {
    getDaySales(state, action) {
      state.getStatus = LoadingStatuses.LOADING;
    },
    setDaySales(state, action) {
      state.sales = action.payload;
      state.getStatus = LoadingStatuses.SUCCESS;
    },
    postDaySales(state, action) {
      state.postStatus = LoadingStatuses.LOADING;
    },
    daySalesPosted(state, action) {
      state.postStatus = LoadingStatuses.SUCCESS;
    },
    updateDaySales(state, action) {
      state.updateStatus = LoadingStatuses.LOADING;
    },
    daySalesUpdated(state, action) {
      state.updateStatus = LoadingStatuses.SUCCESS;
    },
  },
});

export const {
  getDaySales,
  setDaySales,
  postDaySales,
  daySalesPosted,
  updateDaySales,
  daySalesUpdated,
} = daySalesSlice.actions;

export const daySalesReducer = daySalesSlice.reducer;
