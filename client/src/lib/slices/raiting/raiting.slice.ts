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
        state.sales = state.sales.sort((a: any, b: any) => b[action.payload] - a[action.payload]);
      }
    },
  },
});

export const { getSales, setSales, setError, sortBy } = raitingSlice.actions;

export const raitingReducer = raitingSlice.reducer;
