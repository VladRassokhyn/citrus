import { all } from 'redux-saga/effects';
import { authWather } from '../slices/auth/auth.saga';
import { salesmansWatcher } from '../slices/salesmans/salesmans.saga';

export function* rootSaga() {
  yield all([salesmansWatcher(), authWather()]);
}
