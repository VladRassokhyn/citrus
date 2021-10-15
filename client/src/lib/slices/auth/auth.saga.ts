import { userApi } from './../../api/user.api';
import { authApi } from './../../api/auth.api';
import { SagaIterator } from '@redux-saga/types';
import { FixLater } from './../../globalTypes';
import { takeEvery, call, put } from 'redux-saga/effects';
import {
  tryLogin,
  setLogin,
  setAuthError,
  setLoginError,
  getAuth,
  setAuth,
  setAuthUser,
} from './auth.slice';

function* loginWorker(action: FixLater): SagaIterator {
  const { data } = yield call(authApi.login, action.payload);
  yield put({ type: setLogin.type, payload: data });
}

function* authWorker(): SagaIterator {
  const { id } = yield call(authApi.getAuth);

  if (!id) {
    yield put({ type: setAuthError.type });
  } else {
    yield put({ type: setAuth.type });
  }

  const user = yield call(userApi.getUserById, id);

  if (!user) {
    yield put({ type: setAuthError.type });
  } else {
    yield put({ type: setAuthUser.type, payload: user });
  }
}

export function* authWather() {
  yield takeEvery(tryLogin.type, loginWorker);
  yield takeEvery(getAuth.type, authWorker);
}
