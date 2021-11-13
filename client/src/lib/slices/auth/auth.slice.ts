import { LoadingErrors, LoadingStatuses } from './../../globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import { AuthInitial } from './auth.types';

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
    tryLogin(state, action) {
      state.loginStatus = LoadingStatuses.LOADING;
    },
    setLogin(state, action) {
      localStorage.setItem('token', action.payload);
      state.loginStatus = LoadingStatuses.SUCCESS;
    },
    setLoginError(state, action) {
      state.loginError = action.payload;
      state.loginStatus = LoadingStatuses.ERROR;
    },
    getAuth(state) {
      state.authStatus = LoadingStatuses.LOADING;
    },
    setAuth(state, action) {
      state.authStatus = LoadingStatuses.SUCCESS;
    },
    setAuthUser(state, action) {
      state.authUser = action.payload;
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
