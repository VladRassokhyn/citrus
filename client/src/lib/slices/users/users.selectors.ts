import { LoadingStatuses, User, UserRoles } from '../../globalTypes';
import { RootState } from '../../store';
import { Checklist } from '../checklist';

export const selectAllUsers = (state: RootState): User[] => state.users.items;

export const selectUsersStatus = (state: RootState): LoadingStatuses => state.users.status;

export const selectUsersCRUSstatus = (state: RootState): LoadingStatuses => state.users.CRUDstatus;

export const selectOneUser = (state: RootState): User | null => state.oneUser.user;

export const selectOneUserStatus = (state: RootState): LoadingStatuses => state.oneUser.status;

export const selectUserById = (id: string) => (state: RootState): User | null =>
  state.users.items.find((user) => user.id === Number(id)) || null;

export const selectUserChecklists = (state: RootState): Checklist[] | null =>
  state.oneUser.passedChecklists;

export const selectUserChecklistsStatus = (state: RootState): LoadingStatuses =>
  state.oneUser.passedChecklistsStatus;

export const selectSalesmans = (state: RootState): User[] =>
  state.users.items.filter((user) => user.role === UserRoles.SALESMAN);
