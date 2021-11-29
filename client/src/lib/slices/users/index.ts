import {
  selectAllUsers,
  selectUsersCRUSstatus,
  selectUsersStatus,
  selectUserById,
  selectOneUser,
  selectOneUserStatus,
  selectUserChecklists,
  selectUserChecklistsStatus,
} from './users.selectors';
import {
  usersReducer,
  getUsers,
  setUsers,
  postNewUser,
  newUserPosted,
  deleteUser,
  userDeleted,
  updateUser,
  userUpdated,
  statusesResets,
  setError,
  setCRUDError,
} from './users.slice';
import {
  oneUserReducer,
  getOneUser,
  getUserChecklists,
  setUserChecklists,
  setOneUserError,
  setOneUser,
} from './oneUser.slice';
import { usersWatcher } from './users.saga';
import { User } from './users.types';

export const userSelectors = {
  selectAllUsers,
  selectUsersCRUSstatus,
  selectUsersStatus,
  selectUserById,
  selectOneUser,
  selectOneUserStatus,
  selectUserChecklists,
  selectUserChecklistsStatus,
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
  setError,
  setCRUDError,
  getOneUser,
  getUserChecklists,
  setUserChecklists,
};
export type { User };
export { usersReducer, oneUserReducer, usersWatcher };
