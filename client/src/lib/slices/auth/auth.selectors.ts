import { LoadingStatuses, LoadingErrors } from '@lib/globalTypes';
import { User } from '@lib/slices/users';
import { RootState } from '@lib/store';

export const authUser = (state: RootState): User | null => state.auth.authUser;

export const status = (state: RootState): LoadingStatuses => state.auth.status;

export const error = (state: RootState): LoadingErrors => state.auth.error;
