import { FixLater } from './../../types';
import { salesmansApi } from './../../api/salesmans.api';
import { takeEvery, call, put, delay } from 'redux-saga/effects';
import {
  getSalesmans,
  setError,
  setSalesmans,
  postNewSalesman,
  newSalesmanPosted,
} from './salesmans.slice';
import { SagaIterator } from '@redux-saga/types';

function* getSalesmansWorker(): SagaIterator {
  try {
    const { data } = yield call(salesmansApi.getSalesmans);
    yield delay(1000);
    yield put({ type: setSalesmans.type, payload: data });
  } catch (error) {
    yield put({ type: setError.type, payload: error });
  }
}

function* postSalesmanWorker(action: FixLater): SagaIterator {
  try {
    yield call(salesmansApi.postNewSalesman, action.payload);
    yield put({ type: newSalesmanPosted.type });
    yield put({ type: getSalesmans.type });
  } catch (error) {
    yield put({ type: setError.type, payload: error });
  }
}

export function* salesmansWatcher(): SagaIterator {
  yield takeEvery(getSalesmans.type, getSalesmansWorker);
  yield takeEvery(postNewSalesman.type, postSalesmanWorker);
}
