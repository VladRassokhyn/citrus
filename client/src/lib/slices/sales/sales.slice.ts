import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatuses, TTselectorOptions } from '../../globalTypes';
import { SalesState } from './sales.type';

const initialState: SalesState = {
  getStatus: LoadingStatuses.IDLE,
  postStatus: LoadingStatuses.IDLE,
  updateStatus: LoadingStatuses.IDLE,
  deleteStatus: LoadingStatuses.IDLE,
  daySales: null,
};

export const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    getSales(state, action) {
      state.getStatus = LoadingStatuses.LOADING;
    },
    setSales(state, action) {
      state.daySales = action.payload.map((sales: any) => {
        const tt = TTselectorOptions.find((tt) => tt.value === sales.tt);
        return { ...sales, tt };
      });
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
    sortSales(state, action) {
      const id = action.payload.id;
      const newSales = action.payload.sales;
      const index = state.daySales?.findIndex((item) => item.id === id);
      state.daySales![index!].sales = newSales;
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
  sortSales,
} = salesSlice.actions;

export const salesReducer = salesSlice.reducer;
