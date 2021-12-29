import { User } from '@lib/slices/users';
import { LoadingStatuses, LoadingErrors } from '@lib/globalTypes';

export type AuthInitial = {
  status: LoadingStatuses;
  error: LoadingErrors;
  authUser: User | null;
};
