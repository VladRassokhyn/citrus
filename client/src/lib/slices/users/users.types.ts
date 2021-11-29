import { LoadingStatuses, UserRoles } from '../../globalTypes';
import { Checklist } from '../checklist';

export type UsersState = {
  items: User[];
  status: LoadingStatuses;
  CRUDstatus: LoadingStatuses;
  error: any;
};

export type OneUserState = {
  status: LoadingStatuses;
  passedChecklistsStatus: LoadingStatuses;
  user: User | null;
  passedChecklists: Checklist[] | null;
};

export type User = {
  username: string;
  name: string;
  lastName: string;
  role: UserRoles;
  id: number;
  tt: { label: string; value: string };
};
