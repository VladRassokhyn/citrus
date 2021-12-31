import { SalesTuple } from '@lib/slices/sales';
import { LoadingStatuses, Action } from '@lib/globalTypes';
import { createSlice } from '@reduxjs/toolkit';

type State = {
  sales: SalesTuple[] | null;
  status: LoadingStatuses;
};

const initialState: State = {
  sales: null,
  status: LoadingStatuses.IDLE,
};

const raitingSlice = createSlice({
  name: 'raiting',
  initialState,
  reducers: {
    getSales(state, action: Action<{ month: number; year: number }>) {
      state.status = LoadingStatuses.LOADING;
    },
    setSales(state, action: Action<any>) {
      state.sales = action.payload.sort((a: any, b: any) => b[8] - a[8]);
      state.status = LoadingStatuses.SUCCESS;
    },
    setError(state) {
      state.status = LoadingStatuses.ERROR;
    },
    sortBy(state, action: Action<number>) {
      if (state.sales) {
        if (action.payload === 9) {
          state.sales = state.sales.sort(
            (a: any, b: any) => (b[8] / b[1]) * 100 - (a[8] / a[1]) * 100,
          );
        } else if (action.payload === 11) {
          state.sales = state.sales.sort(
            (a: any, b: any) => (b[10] / b[1]) * 100 - (a[10] / a[1]) * 100,
          );
        } else if (action.payload === 18) {
          state.sales = state.sales.sort(
            (a: any, b: any) => b[8] + b[10] + b[12] - (a[8] + a[10] + a[12]),
          );
        } else {
          state.sales = state.sales.sort((a: any, b: any) => b[action.payload] - a[action.payload]);
        }
      }
    },
  },
});

export const { getSales, setSales, setError, sortBy } = raitingSlice.actions;

export const raitingReducer = raitingSlice.reducer;
