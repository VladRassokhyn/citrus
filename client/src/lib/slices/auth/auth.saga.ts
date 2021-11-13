import { usersApi } from './../../api/users.api';
import { authApi } from './../../api/auth.api';
import { SagaIterator } from '@redux-saga/types';
import { FixLater, LoadingErrors } from './../../globalTypes';
import { takeEvery, call, put } from 'redux-saga/effects';
import {
  tryLogin,
  setLogin,
  setAuthError,
  setLoginError,
  getAuth,
  setAuth,
  setAuthUser,
} from '../auth';

function* loginWorker(action: FixLater): SagaIterator {
  try {
    const res = yield call(authApi.login, action.payload);
    yield put({ type: setLogin.type, payload: res.data.token });
    window.location.reload();
  } catch (err) {
    yield put({
      type: setLoginError.type,
      payload: LoadingErrors.NOT_AUTORISED,
    });
  }
}

function* authWorker(): SagaIterator {
  try {
    const res = yield call(authApi.getAuth);

    if (res.status === 401) {
      yield put({ type: setAuthError.type });
    } else {
      const user = yield call(usersApi.getUserById, res.data.userId);

      if (!user) {
        yield put({ type: setAuthError.type });
      } else {
        yield put({ type: setAuthUser.type, payload: user.data });
        yield put({ type: setAuth.type });
      }
    }
  } catch (err) {
    yield put({ type: setAuthError.type });
  }
}

export function* authWather() {
  yield takeEvery(tryLogin.type, loginWorker);
  yield takeEvery(getAuth.type, authWorker);
}
