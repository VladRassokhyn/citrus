import { LoadingStatuses, User } from './../../globalTypes';

export type AuthInitial = {
  loginStatus: LoadingStatuses;
  authStatus: LoadingStatuses;
  error: any;
  authUser: User | null;
};
