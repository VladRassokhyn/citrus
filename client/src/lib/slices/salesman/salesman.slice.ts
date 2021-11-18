import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatuses } from '../../globalTypes';
import { SalesmanState } from './salesman.type';

const initialState: SalesmanState = {
  getStatus: LoadingStatuses.IDLE,
  postStatus: LoadingStatuses.IDLE,
  deleteStatus: LoadingStatuses.IDLE,
  salesmans: null,
};

const salesmanSlice = createSlice({
  name: 'salesman',
  initialState,
  reducers: {
    getSalesmans(state, action) {
      state.getStatus = LoadingStatuses.LOADING;
    },
    setSalesmans(state, action) {
      state.salesmans = action.payload;
      state.getStatus = LoadingStatuses.SUCCESS;
    },
    postSalesman(state, action) {
      state.postStatus = LoadingStatuses.LOADING;
    },
    salesmanPosted(state, action) {
      state.postStatus = LoadingStatuses.SUCCESS;
    },
    deleteSalesman(state, action) {
      state.deleteStatus = LoadingStatuses.LOADING;
    },
    salesmanDeleted(state, action) {
      state.deleteStatus = LoadingStatuses.SUCCESS;
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
