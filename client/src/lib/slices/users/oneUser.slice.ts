import { LoadingStatuses } from './../../globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import { OneUserState } from './users.types';

const initialState: OneUserState = {
  user: null,
  status: LoadingStatuses.IDLE,
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
    setOneUserError(state) {
      state.status = LoadingStatuses.ERROR;
    },
  },
});

export const { getOneUser, setOneUser, setOneUserError } = oneUserSlice.actions;

export const oneUserReducer = oneUserSlice.reducer;
