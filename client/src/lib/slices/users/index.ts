import {
  users,
  status,
  userById,
  oneUser,
  oneUserStatus,
  userChecklists,
  userChecklistsStatus,
  usersByRole,
} from './users.selectors';
import {
  getUsers,
  setUsers,
  postNewUser,
  newUserPosted,
  deleteUser,
  userDeleted,
  updateUser,
  userUpdated,
  statusesResets,
} from './users.slice';
import {
  getOneUser,
  getUserChecklists,
  setUserChecklists,
  setOneUserError,
  setOneUser,
} from './oneUser.slice';

export const userSelectors = {
  users,
  status,
  userById,
  oneUser,
  oneUserStatus,
  userChecklists,
  userChecklistsStatus,
  usersByRole,
};

export const userActions = {
  getUsers,
  setUsers,
  postNewUser,
  newUserPosted,
  deleteUser,
  userDeleted,
  setOneUserError,
  setOneUser,
  updateUser,
  userUpdated,
  statusesResets,
  getOneUser,
  getUserChecklists,
  setUserChecklists,
};
export type { User, OneUserState, UsersState } from './users.types';
export { usersApi } from './users.api';
export { usersReducer } from './users.slice';
export { oneUserReducer } from './oneUser.slice';
export { usersWatcher } from './users.saga';
