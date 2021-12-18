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
export type { User };
export { usersReducer, oneUserReducer, usersWatcher };
