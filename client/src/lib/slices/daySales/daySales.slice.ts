import { LoadingStatuses, TTselectorOptions } from './../../globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import { DaySalesState } from './daySales.type';

const initialState: DaySalesState = {
  getStatus: LoadingStatuses.IDLE,
  postStatus: LoadingStatuses.IDLE,
  updateStatus: LoadingStatuses.IDLE,
  deleteStatus: LoadingStatuses.IDLE,
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
      state.sales = action.payload.map((sales: any) => {
        const tt = TTselectorOptions.find((tt) => tt.value === sales.tt);
        return { ...sales, tt };
      });
      state.getStatus = LoadingStatuses.SUCCESS;
    },
    postDaySales(state, action) {
      state.postStatus = LoadingStatuses.LOADING;
    },
    daySalesPosted(state) {
      state.postStatus = LoadingStatuses.SUCCESS;
    },
    updateDaySales(state, action) {
      state.updateStatus = LoadingStatuses.LOADING;
    },
    daySalesUpdated(state) {
      state.updateStatus = LoadingStatuses.SUCCESS;
    },
    deleteDaySales(state, action) {
      state.deleteStatus = LoadingStatuses.LOADING;
    },
    daySalesDeleted(state) {
      state.deleteStatus = LoadingStatuses.SUCCESS;
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
  deleteDaySales,
  daySalesDeleted,
} = daySalesSlice.actions;

export const daySalesReducer = daySalesSlice.reducer;
