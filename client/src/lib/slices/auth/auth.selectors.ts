import { User } from '../../globalTypes';
import { RootState } from './../../store';
import { authStatuses } from './auth.types';

export const selectAuthUser = (state: RootState): User | null => state.auth.authUser;

export const selectAuthStatuses = (state: RootState): authStatuses => ({
  authStatus: state.auth.authStatus,
  loginStatus: state.auth.loginStatus,
});
