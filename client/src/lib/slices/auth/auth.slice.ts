import { LoadingStatuses } from './../../globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import { AuthInitial } from './auth.types';

const initialState: AuthInitial = {
  status: LoadingStatuses.IDLE,
  authUser: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getAuth(state, action) {
      state.status = LoadingStatuses.LOADING;
    },
    setAuth(state, action) {
      console.log(action.payload);
      localStorage.setItem('token', action.payload);
      state.status = LoadingStatuses.SUCCESS;
    },
    setAuthError(state, action) {
      state.status = LoadingStatuses.ERROR;
    },
  },
});

export const { getAuth, setAuth, setAuthError } = authSlice.actions;

export const authReducer = authSlice.reducer;
