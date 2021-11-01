import { LoadingStatuses } from './../../globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import { OneUserState } from './users.types';

const initialState: OneUserState = {
  user: null,
  status: LoadingStatuses.IDLE,
  passedChecklistsStatus: LoadingStatuses.IDLE,
  passedChecklists: null,
};

export const oneUserSlice = createSlice({
  name: 'oneUser',
  initialState,
  reducers: {
    getOneUser(state, action) {
      state.status = LoadingStatuses.LOADING;
    },
    setOneUser(state, action) {
      state.status = LoadingStatuses.SUCCESS;
      state.user = action.payload;
    },
    getUserChecklists(state, action) {
      state.passedChecklistsStatus = LoadingStatuses.LOADING;
    },
    setUserChecklists(state, action) {
      state.passedChecklists = action.payload;
      state.passedChecklistsStatus = LoadingStatuses.SUCCESS;
    },
    setOneUserError(state) {
      state.status = LoadingStatuses.ERROR;
    },
  },
});

export const {
  getOneUser,
  setOneUser,
  setOneUserError,
  getUserChecklists,
  setUserChecklists,
} = oneUserSlice.actions;

export const oneUserReducer = oneUserSlice.reducer;
