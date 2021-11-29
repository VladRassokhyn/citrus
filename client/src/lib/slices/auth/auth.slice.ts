import { Action, LoadingErrors, LoadingStatuses, TTselectorOptions } from './../../globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import { AuthInitial } from './auth.types';
import { User } from '../users';

const initialState: AuthInitial = {
  loginStatus: LoadingStatuses.IDLE,
  authStatus: LoadingStatuses.IDLE,
  authUser: null,
  loginError: LoadingErrors.IDLE,
  authError: LoadingErrors.IDLE,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    tryLogin(state, action: Action<{ username: string; password: string }>) {
      state.loginStatus = LoadingStatuses.LOADING;
    },
    setLogin(state, action: Action<string>) {
      localStorage.setItem('token', action.payload);
      state.loginStatus = LoadingStatuses.SUCCESS;
    },
    setLoginError(state, action: Action<LoadingErrors>) {
      state.loginError = action.payload;
      state.loginStatus = LoadingStatuses.ERROR;
    },
    getAuth(state) {
      state.authStatus = LoadingStatuses.LOADING;
    },
    setAuth(state) {
      state.authStatus = LoadingStatuses.SUCCESS;
    },
    setAuthUser(state, action: Action<User>) {
      state.authUser = action.payload;
      const tt = TTselectorOptions.find((tt) => tt.value === String(action.payload.tt));
      if (state.authUser && tt) {
        state.authUser.tt = tt;
      }
    },
    logout(state) {
      localStorage.setItem('token', '');
      state.authUser = null;
      state.loginError = LoadingErrors.IDLE;
      state.authError = LoadingErrors.IDLE;
      window.location.reload();
    },
    setAuthError(state) {
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
  logout,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
