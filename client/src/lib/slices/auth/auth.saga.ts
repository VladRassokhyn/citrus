import { SagaIterator } from '@redux-saga/types';
import { takeEvery, call, put } from 'redux-saga/effects';
import { Action, LoadingErrors } from '@lib/globalTypes';
import { authActions, authApi } from '@lib/slices/auth';
import { shopActions } from '@lib/slices/shop';

function* authWorker(): SagaIterator {
  try {
    const authRes = yield call(authApi.getAuth);

    if (authRes.status === 401) {
      yield put(authActions.setAuthError());
    } else {
      if (authRes.status !== 200) {
        yield put(authActions.setAuthError());
      } else {
        yield put(authActions.setAuthUser(authRes.data));
        yield put(shopActions.setCurrentShop(authRes.data.shop));
        yield put(authActions.setAuth());
      }
    }
  } catch (err) {
    yield put(authActions.setAuthError());
  }
}

function* loginWorker(action: Action<{ username: string; password: string }>): SagaIterator {
  try {
    const res = yield call(authApi.login, action.payload);
    yield put(authActions.setLogin(res.data.token));
    yield put(authActions.getAuth());
  } catch (err) {
    yield put(authActions.setLoginError(LoadingErrors.NOT_AUTORISED));
  }
}

export function* authWather(): SagaIterator {
  yield takeEvery(authActions.tryLogin.type, loginWorker);
  yield takeEvery(authActions.getAuth.type, authWorker);
}
