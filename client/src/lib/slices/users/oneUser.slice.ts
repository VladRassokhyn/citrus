import { Action, LoadingStatuses } from './../../globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import { OneUserState, User } from './users.types';
import { Checklist } from '../checklist';

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
    getOneUser(state, action: Action<string>) {
      state.status = LoadingStatuses.LOADING;
    },
    setOneUser(state, action: Action<User>) {
      state.status = LoadingStatuses.SUCCESS;
      state.user = action.payload;
    },
    getUserChecklists(state, action: Action<number>) {
      state.passedChecklistsStatus = LoadingStatuses.LOADING;
    },
    setUserChecklists(state, action: Action<Checklist[]>) {
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
