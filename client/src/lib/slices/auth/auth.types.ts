import { User } from '../users';
import { LoadingStatuses, LoadingErrors } from './../../globalTypes';

export type AuthInitial = {
  status: LoadingStatuses;
  error: LoadingErrors;
  authUser: User | null;
};
