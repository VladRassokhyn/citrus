import { shopApi } from './../shop/shop.api';
import { usersApi } from '../users/users.api';
import { authApi } from './auth.api';
import { SagaIterator } from '@redux-saga/types';
import { Action, LoadingErrors } from './../../globalTypes';
import { takeEvery, call, put } from 'redux-saga/effects';
import { authActions } from '../auth';
import { Shop } from '../shop';

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
      const userRes = yield call(usersApi.getUserById, res.data.userId);

      if (!userRes) {
        yield put(authActions.setAuthError());
      } else {
        const shopsRes = yield call(shopApi.getShops);
        const tt = shopsRes.data.find((tt: Shop) => tt.name === userRes.data.tt);
        const user = { ...userRes.data, tt: { label: tt.name_1c, value: tt.name } };
        yield put(authActions.setAuthUser(user));
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
