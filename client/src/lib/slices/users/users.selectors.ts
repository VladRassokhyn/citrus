import { RootState } from '@lib/store';
import { LoadingStatuses, UserRoles } from '@lib/globalTypes';
import { Checklist } from '@lib/slices/checklist';
import { User } from '@lib/slices/users';

export const users = (state: RootState): User[] => state.users.items;

export const usersByRole = (role: UserRoles) => (state: RootState): User[] =>
  state.users.items.filter((user) => user.role === role) || [];

export const status = (state: RootState): LoadingStatuses => state.users.status;

export const oneUser = (state: RootState): User | null => state.oneUser.user;

export const oneUserStatus = (state: RootState): LoadingStatuses => state.oneUser.status;

export const userById = (id: string | number) => (state: RootState): User | null =>
  state.users.items.find((user) => user.id === Number(id)) || null;

export const userChecklists = (state: RootState): Checklist[] | null =>
  state.oneUser.passedChecklists;

export const userChecklistsStatus = (state: RootState): LoadingStatuses =>
  state.oneUser.passedChecklistsStatus;

export const salesmans = (state: RootState): User[] =>
  state.users.items.filter((user) => user.role === UserRoles.SALESMAN);
