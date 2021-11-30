import { createSlice } from '@reduxjs/toolkit';
import { Action, LoadingStatuses, TTselectorOptions } from '../../globalTypes';
import {
  GetSalesPayload,
  Sales,
  SalesState,
  PostSalesPayload,
  PutSalesPayload,
} from './sales.type';

const initialState: SalesState = {
  getStatus: LoadingStatuses.IDLE,
  postStatus: LoadingStatuses.IDLE,
  updateStatus: LoadingStatuses.IDLE,
  deleteStatus: LoadingStatuses.IDLE,
  mounth: new Date().getMonth(),
  year: new Date().getFullYear(),
  daySales: null,
};

export const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    getSales(state, action: Action<GetSalesPayload>) {
      state.getStatus = LoadingStatuses.LOADING;
    },
    setSales(state, action) {
      state.daySales = action.payload.map((sales: Sales) => {
        const tt = TTselectorOptions.find((tt) => tt.value === sales.tt.value);
        return { ...sales, tt };
      });
      state.getStatus = LoadingStatuses.SUCCESS;
    },
    postSales(state, action: Action<PostSalesPayload>) {
      state.postStatus = LoadingStatuses.LOADING;
    },
    salesPosted(state) {
      state.postStatus = LoadingStatuses.SUCCESS;
    },
    updateSales(state, action: Action<PutSalesPayload>) {
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
      if (state.daySales) {
        const index = state.daySales.findIndex((item) => item.id === id);
        state.daySales[index].sales = newSales;
      }
    },
    setMounth(state, action: Action<{ mounth: number; year: number }>) {
      state.mounth = action.payload.mounth;
      state.year = action.payload.year;
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
  setMounth,
} = salesSlice.actions;

export const salesReducer = salesSlice.reducer;
