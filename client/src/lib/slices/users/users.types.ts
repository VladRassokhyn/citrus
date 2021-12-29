import { LoadingStatuses, UserRoles } from '@lib/globalTypes';
import { Checklist } from '@lib/slices/checklist';
import { Shop } from '@lib/slices/shop';

export type UsersState = {
  items: User[];
  status: LoadingStatuses;
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
  shop: Shop;
};
