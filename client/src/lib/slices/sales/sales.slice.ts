import { createSlice } from '@reduxjs/toolkit';
import { Action, LoadingStatuses } from '../../globalTypes';
import {
  GetSalesPayload,
  Sales,
  SalesState,
  PostSalesPayload,
  PutSalesPayload,
} from './sales.type';

const initialState: SalesState = {
  status: LoadingStatuses.IDLE,
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  daySales: null,
};

export const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    getSales(state, action: Action<GetSalesPayload>) {
      state.status = LoadingStatuses.LOADING;
    },
    setSales(state, action) {
      state.daySales = action.payload;
      state.daySales?.sort((a, b) => parseInt(a.day.split('.')[0]) - parseInt(b.day.split('.')[0]));
      state.status = LoadingStatuses.SUCCESS;
    },
    postSales(state, action: Action<PostSalesPayload>) {
      state.status = LoadingStatuses.LOADING;
    },
    salesPosted(state) {
      state.status = LoadingStatuses.SUCCESS;
    },
    updateSales(state, action: Action<PutSalesPayload>) {
      state.status = LoadingStatuses.LOADING;
    },
    salesUpdated(state) {
      state.status = LoadingStatuses.SUCCESS;
    },
    deleteSales(state, action) {
      state.status = LoadingStatuses.LOADING;
    },
    salesDeleted(state) {
      state.status = LoadingStatuses.SUCCESS;
    },
    sortSales(state, action) {
      const id = action.payload.id;
      const newSales = action.payload.sales;
      if (state.daySales) {
        const index = state.daySales.findIndex((item) => item.id === id);
        state.daySales[index].sales = newSales;
      }
    },
    setmonth(state, action: Action<{ month: number; year: number }>) {
      state.month = action.payload.month;
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
  setmonth,
} = salesSlice.actions;

export const salesReducer = salesSlice.reducer;
