import { LoadingStatuses } from './../../globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import { DaySalesState } from './daySales.type';

const initialState: DaySalesState = {
  getStatus: LoadingStatuses.IDLE,
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
  },
});

export const { getDaySales, setDaySales } = daySalesSlice.actions;

export const daySalesReducer = daySalesSlice.reducer;
