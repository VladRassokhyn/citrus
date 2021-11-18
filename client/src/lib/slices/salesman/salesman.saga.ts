import { call, put, takeEvery } from '@redux-saga/core/effects';
import { SagaIterator } from '@redux-saga/types';
import { salesmanApi } from '../../api/salesman.api';
import { FixLater } from '../../globalTypes';
import {
  deleteSalesman,
  getSalesmans,
  postSalesman,
  salesmanDeleted,
  salesmanPosted,
  setSalesmans,
} from './salesman.slice';

function* getSalesmansWorker(action: FixLater): SagaIterator {
  try {
    const res = yield call(salesmanApi.getSalesmans, action.payload);
    yield put({ type: setSalesmans.type, payload: res.data });
  } catch (err) {
    console.log(err);
  }
}

function* postSalesmansWorker(action: FixLater): SagaIterator {
  try {
    yield call(salesmanApi.postSalesmans, action.payload);
    yield put({ type: salesmanPosted.type });
  } catch (err) {
    console.log(err);
  }
}

function* deleteSalesmansWorker(action: FixLater): SagaIterator {
  try {
    const res = yield call(salesmanApi.deleteSalesmans, action.payload);
    yield put({ type: salesmanDeleted.type });
  } catch (err) {
    console.log(err);
  }
}

export function* salesmanWatcher(): SagaIterator {
  yield takeEvery(getSalesmans.type, getSalesmansWorker);
  yield takeEvery(deleteSalesman.type, deleteSalesmansWorker);
  yield takeEvery(postSalesman.type, postSalesmansWorker);
}
