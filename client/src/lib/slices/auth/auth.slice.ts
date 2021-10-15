import { LoadingStatuses } from './../../globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import { AuthInitial } from './auth.types';

const initialState: AuthInitial = {
  loginStatus: LoadingStatuses.IDLE,
  authStatus: LoadingStatuses.IDLE,
  authUser: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    tryLogin(state, action) {
      state.loginStatus = LoadingStatuses.LOADING;
    },
    setLogin(state, action) {
      localStorage.setItem('token', action.payload.token);
      state.loginStatus = LoadingStatuses.SUCCESS;
    },
    getAuth(state) {
      state.authStatus = LoadingStatuses.LOADING;
    },
    setAuth(state, action) {
      state.authStatus = LoadingStatuses.SUCCESS;
    },
    setAuthUser(state, action) {
      state.authUser = action.payload.user;
    },
    setLoginError(state, action) {
      state.authStatus = LoadingStatuses.ERROR;
    },
    setAuthError(state, action) {
      state.authStatus = LoadingStatuses.ERROR;
    },
  },
});

export const {
  tryLogin,
  setLogin,
  setAuthError,
  setLoginError,
  getAuth,
  setAuth,
  setAuthUser,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
