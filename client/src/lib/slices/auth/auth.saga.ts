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
  try {
    const res = yield call(authApi.getAuth);
    console.log(res);

    if (res.status === 401) {
      yield put({ type: setAuthError.type });
      console.log('wrong user data');
    } else {
    }

    const user = yield call(userApi.getUserById, res.data.userId);

    if (!user) {
      yield put({ type: setAuthError.type });
    } else {
      yield put({ type: setAuthUser.type, payload: user.data });
      yield put({ type: setAuth.type });
    }
  } catch (err) {
    yield put({ type: setAuthError.type });
  }
}

export function* authWather() {
  yield takeEvery(tryLogin.type, loginWorker);
  yield takeEvery(getAuth.type, authWorker);
}
