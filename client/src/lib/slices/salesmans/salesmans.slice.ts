import { SalesmanState } from './salesmans.types';
import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatuses } from '../../globalTypes';

const initialState: SalesmanState = {
  items: [],
  status: LoadingStatuses.IDLE,
  CRUDstatus: LoadingStatuses.IDLE,
  error: null,
};

const salesmansSlice = createSlice({
  name: 'salesmans',
  initialState,
  reducers: {
    getSalesmans(state) {
      state.status = LoadingStatuses.LOADING;
    },
    setSalesmans(state, action) {
      state.items = action.payload;
      state.status = LoadingStatuses.SUCCESS;
    },
    setError(state, action) {
      state.status = LoadingStatuses.ERROR;
      state.error = action.payload;
    },
    postNewSalesman(state, action) {
      state.CRUDstatus = LoadingStatuses.LOADING;
    },
    newSalesmanPosted(state) {
      state.CRUDstatus = LoadingStatuses.SUCCESS;
    },
  },
});

export const {
  getSalesmans,
  setSalesmans,
  setError,
  postNewSalesman,
  newSalesmanPosted,
} = salesmansSlice.actions;

export const salesmansReducer = salesmansSlice.reducer;
