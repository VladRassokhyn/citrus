import { User, UsersState } from '@lib/slices/users';
import { createSlice } from '@reduxjs/toolkit';
import { Action, LoadingStatuses } from '@lib/globalTypes';

const initialState: UsersState = {
  items: [],
  status: LoadingStatuses.IDLE,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers(state, action: Action<number>) {
      state.status = LoadingStatuses.LOADING;
    },
    setUsers(state, action: Action<User[]>) {
      state.items = action.payload;
      state.status = LoadingStatuses.SUCCESS;
    },
    postNewUser(state, action: Action<User>) {
      state.status = LoadingStatuses.LOADING;
    },
    newUserPosted(state) {
      state.status = LoadingStatuses.SUCCESS;
    },
    deleteUser(state, action: Action<User>) {
      state.status = LoadingStatuses.LOADING;
    },
    userDeleted(state) {
      state.status = LoadingStatuses.SUCCESS;
    },
    updateUser(state, action: Action<User>) {
      state.status = LoadingStatuses.LOADING;
    },
    userUpdated(state) {
      state.status = LoadingStatuses.SUCCESS;
    },
    statusesResets(state) {
      state.status = LoadingStatuses.IDLE;
      state.status = LoadingStatuses.IDLE;
    },
  },
});

export const {
  getUsers,
  setUsers,
  postNewUser,
  newUserPosted,
  deleteUser,
  userDeleted,
  updateUser,
  userUpdated,
  statusesResets,
} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
