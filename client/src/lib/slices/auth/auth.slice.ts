import { Action, LoadingErrors, LoadingStatuses, TTselectorOptions } from './../../globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import { AuthInitial } from './auth.types';
import { User } from '../users';

const initialState: AuthInitial = {
  status: LoadingStatuses.IDLE,
  authUser: null,
  error: LoadingErrors.IDLE,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    tryLogin(state, action: Action<{ username: string; password: string }>) {
      state.status = LoadingStatuses.LOADING;
    },
    setLogin(state, action: Action<string>) {
      localStorage.setItem('token', action.payload);
      state.status = LoadingStatuses.SUCCESS;
    },
    setLoginError(state, action: Action<LoadingErrors>) {
      state.error = action.payload;
      state.status = LoadingStatuses.ERROR;
    },
    getAuth(state) {
      state.status = LoadingStatuses.LOADING;
    },
    setAuth(state) {
      state.status = LoadingStatuses.SUCCESS;
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
      state.error = LoadingErrors.IDLE;
      window.location.reload();
    },
    setAuthError(state) {
      state.status = LoadingStatuses.ERROR;
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
