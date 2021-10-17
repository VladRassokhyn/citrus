import { RootState } from './../../store';

export const selectAuthUser = (state: RootState) => state.auth.authUser;

export const selectAuthStatuses = (state: RootState) => ({
  authStatus: state.auth.authStatus,
  loginStatus: state.auth.loginStatus,
});
