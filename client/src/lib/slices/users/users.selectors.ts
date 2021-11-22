import { LoadingStatuses, User, UserRoles } from '../../globalTypes';
import { RootState } from '../../store';

export const selectAllUsers = (state: RootState): User[] => state.users.items;

export const selectUsersStatus = (state: RootState): LoadingStatuses => state.users.status;

export const selectUsersCRUSstatus = (state: RootState): LoadingStatuses => state.users.CRUDstatus;

export const selectOneUser = (state: RootState) => state.oneUser.user;

export const selectOneUserStatus = (state: RootState) => state.oneUser.status;

export const selectUserById = (id: string) => (state: RootState): User | undefined =>
  state.users.items.find((user) => user.id === Number(id));

export const selectUserChecklists = (state: RootState) => state.oneUser.passedChecklists;

export const selectUserChecklistsStatus = (state: RootState) =>
  state.oneUser.passedChecklistsStatus;

export const selectSalesmans = (state: RootState) =>
  state.users.items.filter((user) => user.role === UserRoles.SALESMAN);
