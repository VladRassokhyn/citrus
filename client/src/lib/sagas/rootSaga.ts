import { all } from 'redux-saga/effects';
import { getSalesmansWatcher } from '../slices/salesmans/salesmans.saga';

export function* rootSaga() {
  yield all([getSalesmansWatcher()]);
}
