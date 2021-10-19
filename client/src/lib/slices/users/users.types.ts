import { LoadingStatuses, User } from '../../globalTypes';

export type UsersState = {
  items: User[];
  status: LoadingStatuses;
  CRUDstatus: LoadingStatuses;
  error: any;
};

export type OneUserState = {
  status: LoadingStatuses;
  user: User | null;
};
