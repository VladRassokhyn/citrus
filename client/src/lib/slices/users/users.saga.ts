import { Action, FixLater } from '../../globalTypes';
import { usersApi } from './users.api';
import { takeEvery, call, put } from 'redux-saga/effects';
import { User, userActions } from '../users';
import { SagaIterator } from '@redux-saga/types';

function* getUsersWorker(action: Action<number>): SagaIterator {
  try {
    const { data } = yield call(usersApi.getUsers, action.payload);
    yield put(userActions.setUsers(data));
  } catch (error) {
    console.log(error);
  }
}

function* postUsersWorker(action: Action<User>): SagaIterator {
  try {
    yield call(usersApi.postNewUser, action.payload);
    yield put(userActions.newUserPosted());
    yield put(userActions.getUsers(action.payload.shop.id));
  } catch (error) {
    console.log(error);
  }
}

function* deleteUserWorker(action: Action<User>): SagaIterator {
  try {
    yield call(usersApi.deleteUser, action.payload.id);
    yield put(userActions.userDeleted());
    yield put(userActions.getUsers(action.payload.shop.id));
  } catch (error) {
    console.log(error);
  }
}

function* updateUserWorker(action: Action<User>): SagaIterator {
  try {
    yield call(usersApi.updateUser, action.payload);
    yield put(userActions.userUpdated());
    yield put(userActions.getUsers(action.payload.shop.id));
  } catch (error) {
    console.log(error);
  }
}

function* getUserByIdWorker(action: Action<number>): SagaIterator {
  try {
    const res = yield call(usersApi.getUserById, action.payload);
    yield put(userActions.setOneUser(res.data));
  } catch (error) {
    console.log(error);
  }
}

function* getUsersChecklistsWorker(action: Action<number>): SagaIterator {
  try {
    const res = yield call(usersApi.getUserChecklists, action.payload);
    yield put(userActions.setUserChecklists(res.data));
  } catch (error) {
    console.log(error);
  }
}

export function* usersWatcher(): SagaIterator {
  yield takeEvery(userActions.getUsers.type, getUsersWorker);
  yield takeEvery(userActions.postNewUser.type, postUsersWorker);
  yield takeEvery(userActions.deleteUser.type, deleteUserWorker);
  yield takeEvery(userActions.updateUser.type, updateUserWorker);
  yield takeEvery(userActions.getOneUser.type, getUserByIdWorker);
  yield takeEvery(userActions.getUserChecklists.type, getUsersChecklistsWorker);
}
