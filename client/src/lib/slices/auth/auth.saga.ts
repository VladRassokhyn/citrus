import { authApi } from './../../api/auth.api';
import { SagaIterator } from '@redux-saga/types';
import { FixLater } from './../../globalTypes';
import { takeEvery, call, put } from 'redux-saga/effects';
import { getAuth, setAuth } from './auth.slice';

function* authWorker(action: FixLater): SagaIterator {
  const token = yield call(authApi.login, action.payload);
  yield put({ type: setAuth.type, payload: token });
}

export function* authWather() {
  yield takeEvery(getAuth.type, authWorker);
}
