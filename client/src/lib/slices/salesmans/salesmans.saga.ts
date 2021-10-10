import { salesmansApi } from './../../api/salesmans.api';
import { takeEvery, call, put } from 'redux-saga/effects';
import { getSalesmans, setError, setSalesmans } from './salesmans.slice';
import { SagaIterator } from '@redux-saga/types';

function* getSalesmansWorker(): SagaIterator {
  try {
    const { data } = yield call(salesmansApi.getSalesmans);
    yield put({ type: setSalesmans.type, payload: data });
  } catch (error) {
    yield put({ type: setError.type, payload: error });
  }
}

export function* getSalesmansWatcher(): SagaIterator {
  yield takeEvery(getSalesmans.type, getSalesmansWorker);
}
