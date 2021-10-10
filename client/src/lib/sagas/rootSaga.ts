import { all } from 'redux-saga/effects';
import { salesmansWatcher } from '../slices/salesmans/salesmans.saga';

export function* rootSaga() {
  yield all([salesmansWatcher()]);
}
