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

export function* authWather(): SagaIterator {
  yield takeEvery(authActions.tryLogin.type, loginWorker);
}
