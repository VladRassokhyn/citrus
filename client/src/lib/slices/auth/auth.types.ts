import { LoadingStatuses } from './../../globalTypes';

export type AuthInitial = {
  status: LoadingStatuses;
  error: any;
  authUser: {
    username: string;
    role: string;
    id: number;
  } | null;
};
