import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatuses } from '../../globalTypes';
import { SalesState } from './sales.type';

const initialState: SalesState = {
  getStatus: LoadingStatuses.IDLE,
  postStatus: LoadingStatuses.IDLE,
  updateStatus: LoadingStatuses.IDLE,
  deleteStatus: LoadingStatuses.IDLE,
  sales: null,
};

export const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    getSales(state, action) {
      state.getStatus = LoadingStatuses.LOADING;
    },
    setSales(state, action) {
      state.sales = action.payload;
      state.getStatus = LoadingStatuses.SUCCESS;
    },
    postSales(state, action) {
      state.postStatus = LoadingStatuses.LOADING;
    },
    salesPosted(state) {
      state.postStatus = LoadingStatuses.SUCCESS;
    },
    updateSales(state, action) {
      state.updateStatus = LoadingStatuses.LOADING;
    },
    salesUpdated(state) {
      state.updateStatus = LoadingStatuses.SUCCESS;
    },
    deleteSales(state, action) {
      state.deleteStatus = LoadingStatuses.LOADING;
    },
    salesDeleted(state) {
      state.deleteStatus = LoadingStatuses.SUCCESS;
    },
  },
});

export const {
  getSales,
  setSales,
  postSales,
  salesPosted,
  updateSales,
  salesUpdated,
  deleteSales,
  salesDeleted,
} = salesSlice.actions;

export const salesReducer = salesSlice.reducer;
