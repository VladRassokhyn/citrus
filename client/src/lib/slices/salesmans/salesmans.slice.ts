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
    postNewSalesman(state, action) {
      state.CRUDstatus = LoadingStatuses.LOADING;
    },
    newSalesmanPosted(state) {
      state.CRUDstatus = LoadingStatuses.SUCCESS;
    },
    deleteSalesman(state, action) {
      state.CRUDstatus = LoadingStatuses.LOADING;
    },
    salesmanDeleted(state) {
      state.CRUDstatus = LoadingStatuses.SUCCESS;
    },
    statusesResets(state) {
      state.CRUDstatus = LoadingStatuses.IDLE;
      state.status = LoadingStatuses.IDLE;
    },
    setError(state) {
      state.status = LoadingStatuses.ERROR;
    },
    setCRUDError(state) {
      state.CRUDstatus = LoadingStatuses.ERROR;
    },
  },
});

export const {
  getSalesmans,
  setSalesmans,
  setError,
  postNewSalesman,
  newSalesmanPosted,
  deleteSalesman,
  statusesResets,
  setCRUDError,
} = salesmansSlice.actions;

export const salesmansReducer = salesmansSlice.reducer;
