import { User } from '../users';
import { LoadingStatuses, LoadingErrors } from './../../globalTypes';

export type AuthInitial = {
  loginStatus: LoadingStatuses;
  authStatus: LoadingStatuses;
  loginError: LoadingErrors;
  authError: LoadingErrors;
  authUser: User | null;
};

export type authStatuses = { authStatus: LoadingStatuses; loginStatus: LoadingStatuses };
