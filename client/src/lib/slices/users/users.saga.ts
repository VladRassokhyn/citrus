import { FixLater } from '../../globalTypes';
import { usersApi } from '../../api/users.api';
import { takeEvery, call, put, delay } from 'redux-saga/effects';
import {
  getUsers,
  setError,
  setCRUDError,
  setUsers,
  postNewUser,
  newUserPosted,
  deleteUser,
  userDeleted,
  userUpdated,
  updateUser,
} from './users.slice';
import { SagaIterator } from '@redux-saga/types';
import { getOneUser, setOneUser, setOneUserError } from './oneUser.slice';
import { getUserChecklists, setUserChecklists } from '.';

function* getUsersWorker(action: FixLater): SagaIterator {
  try {
    const { data } = yield call(usersApi.getUsers, action.payload);
    yield delay(500);
    yield put({ type: setUsers.type, payload: data });
  } catch (error) {
    yield put({ type: setError.type });
  }
}

function* postUsersWorker(action: FixLater): SagaIterator {
  try {
    yield call(usersApi.postNewUser, action.payload);
    yield put({ type: newUserPosted.type });
    yield put({ type: getUsers.type });
  } catch (error) {
    yield put({ type: setCRUDError.type });
  }
}

function* deleteUserWorker(action: FixLater): SagaIterator {
  try {
    yield call(usersApi.deleteUser, action.payload);
    yield put({ type: userDeleted.type });
    yield put({ type: getUsers.type });
  } catch (error) {
    yield put({ type: setCRUDError.type });
  }
}

function* updateUserWorker(action: FixLater): SagaIterator {
  try {
    yield call(usersApi.updateUser, action.payload);
    yield put({ type: userUpdated.type });
    yield put({ type: getUsers.type });
  } catch (error) {
    yield put({ type: setCRUDError.type });
  }
}

function* getUserByIdWorker(action: FixLater): SagaIterator {
  try {
    const res = yield call(usersApi.getUserById, action.payload);
    yield put({ type: setOneUser.type, payload: res.data });
  } catch (err) {
    yield put({ type: setOneUserError.type });
  }
}

function* getUsersChecklistsWorker(action: FixLater): SagaIterator {
  try {
    const res = yield call(usersApi.getUserChecklists, action.payload);
    yield put({ type: setUserChecklists.type, payload: res.data });
  } catch (err) {
    yield put({ type: setOneUserError.type });
  }
}

export function* usersWatcher(): SagaIterator {
  yield takeEvery(getUsers.type, getUsersWorker);
  yield takeEvery(postNewUser.type, postUsersWorker);
  yield takeEvery(deleteUser.type, deleteUserWorker);
  yield takeEvery(updateUser.type, updateUserWorker);
  yield takeEvery(getOneUser.type, getUserByIdWorker);
  yield takeEvery(getUserChecklists, getUsersChecklistsWorker);
}
