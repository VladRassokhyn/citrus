import { UsersState } from './users.types';
import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatuses } from '../../globalTypes';

const initialState: UsersState = {
  items: [],
  status: LoadingStatuses.IDLE,
  CRUDstatus: LoadingStatuses.IDLE,
  error: null,
};

const usersSlice = createSlice({
  name: 'salesmans',
  initialState,
  reducers: {
    getUsers(state) {
      state.status = LoadingStatuses.LOADING;
    },
    setUsers(state, action) {
      state.items = action.payload;
      state.status = LoadingStatuses.SUCCESS;
    },
    postNewUser(state, action) {
      state.CRUDstatus = LoadingStatuses.LOADING;
    },
    newUserPosted(state) {
      state.CRUDstatus = LoadingStatuses.SUCCESS;
    },
    deleteUser(state, action) {
      state.CRUDstatus = LoadingStatuses.LOADING;
    },
    userDeleted(state) {
      state.CRUDstatus = LoadingStatuses.SUCCESS;
    },
    updateUser(state, action) {
      state.CRUDstatus = LoadingStatuses.LOADING;
    },
    userUpdated(state) {
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
  getUsers,
  setUsers,
  postNewUser,
  newUserPosted,
  deleteUser,
  userDeleted,
  updateUser,
  userUpdated,
  statusesResets,
  setError,
  setCRUDError,
} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;