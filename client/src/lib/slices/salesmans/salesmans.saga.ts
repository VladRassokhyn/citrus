import { FixLater } from '../../globalTypes';
import { salesmansApi } from './../../api/salesmans.api';
import { takeEvery, call, put, delay } from 'redux-saga/effects';
import {
  getSalesmans,
  setError,
  setCRUDError,
  setSalesmans,
  postNewSalesman,
  newSalesmanPosted,
  deleteSalesman,
  salesmanDeleted,
} from './salesmans.slice';
import { SagaIterator } from '@redux-saga/types';

function* getSalesmansWorker(): SagaIterator {
  try {
    const { data } = yield call(salesmansApi.getSalesmans);
    yield delay(1000);
    yield put({ type: setSalesmans.type, payload: data });
  } catch (error) {
    yield put({ type: setError.type });
  }
}

function* postSalesmanWorker(action: FixLater): SagaIterator {
  try {
    yield call(salesmansApi.postNewSalesman, action.payload);
    yield put({ type: newSalesmanPosted.type });
    yield put({ type: getSalesmans.type });
  } catch (error) {
    yield put({ type: setCRUDError.type });
  }
}

function* deleteSalesmanWorker(action: FixLater): SagaIterator {
  try {
    yield call(salesmansApi.deleteSalesman, action.payload);
    yield put({ type: salesmanDeleted.type });
    yield put({ type: getSalesmans.type });
  } catch (error) {
    yield put({ type: setCRUDError.type });
  }
}

export function* salesmansWatcher(): SagaIterator {
  yield takeEvery(getSalesmans.type, getSalesmansWorker);
  yield takeEvery(postNewSalesman.type, postSalesmanWorker);
  yield takeEvery(deleteSalesman.type, deleteSalesmanWorker);
}
