import { createSlice } from '@reduxjs/toolkit';
import { Action, LoadingStatuses } from '../../globalTypes';
import { SalesmanState, SalesmanPostPayload, Salesman } from './salesman.type';

const initialState: SalesmanState = {
  status: LoadingStatuses.IDLE,
  salesmans: null,
};

const salesmanSlice = createSlice({
  name: 'salesman',
  initialState,
  reducers: {
    getSalesmans(state, action: Action<string>) {
      state.status = LoadingStatuses.LOADING;
    },
    setSalesmans(state, action: Action<Salesman[]>) {
      state.salesmans = action.payload;
      state.status = LoadingStatuses.SUCCESS;
    },
    postSalesman(state, action: Action<SalesmanPostPayload>) {
      state.status = LoadingStatuses.LOADING;
    },
    salesmanPosted(state) {
      state.status = LoadingStatuses.SUCCESS;
    },
    deleteSalesman(state, action: Action<Salesman>) {
      state.status = LoadingStatuses.LOADING;
    },
    salesmanDeleted(state) {
      state.status = LoadingStatuses.SUCCESS;
    },
  },
});

export const {
  getSalesmans,
  setSalesmans,
  postSalesman,
  salesmanPosted,
  deleteSalesman,
  salesmanDeleted,
} = salesmanSlice.actions;

export const salesmanReducer = salesmanSlice.reducer;
