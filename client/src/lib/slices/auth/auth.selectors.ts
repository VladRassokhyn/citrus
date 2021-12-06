import { LoadingStatuses, LoadingErrors } from './../../globalTypes';
import { User } from '../users';
import { RootState } from './../../store';

export const authUser = (state: RootState): User | null => state.auth.authUser;

export const status = (state: RootState): LoadingStatuses => state.auth.status;

export const error = (state: RootState): LoadingErrors => state.auth.error;
