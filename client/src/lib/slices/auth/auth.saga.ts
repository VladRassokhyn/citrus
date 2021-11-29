import { usersApi } from '../users/users.api';
import { authApi } from './auth.api';
import { SagaIterator } from '@redux-saga/types';
import { Action, LoadingErrors } from './../../globalTypes';
import { takeEvery, call, put } from 'redux-saga/effects';
import { authActions } from '../auth';

function* loginWorker(action: Action<{ username: string; password: string }>): SagaIterator {
  try {
    const res = yield call(authApi.login, action.payload);
    yield put(authActions.setLogin(res.data.token));
    window.location.reload();
  } catch (err) {
    yield put(authActions.setLoginError(LoadingErrors.NOT_AUTORISED));
  }
}

function* authWorker(): SagaIterator {
  try {
    const res = yield call(authApi.getAuth);

    if (res.status === 401) {
      yield put(authActions.setAuthError());
    } else {
      const user = yield call(usersApi.getUserById, res.data.userId);

      if (!user) {
        yield put(authActions.setAuthError());
      } else {
        yield put(authActions.setAuthUser(user.data));
        yield put(authActions.setAuth());
      }
    }
  } catch (err) {
    yield put(authActions.setAuthError());
  }
}

export function* authWather(): SagaIterator {
  yield takeEvery(authActions.tryLogin.type, loginWorker);
  yield takeEvery(authActions.getAuth.type, authWorker);
}
