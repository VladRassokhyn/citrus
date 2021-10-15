import { LoadingStatuses } from './../../globalTypes';

export type AuthInitial = {
  loginStatus: LoadingStatuses;
  authStatus: LoadingStatuses;
  error: any;
  authUser: {
    username: string;
    role: string;
    id: number;
  } | null;
};
