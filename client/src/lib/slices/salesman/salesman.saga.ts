import { call, put, takeEvery } from '@redux-saga/core/effects';
import { SagaIterator } from '@redux-saga/types';
import { salesmanApi, salesmanActions, Salesman, SalesmanPostPayload } from '@lib/slices/salesman';
import { Action } from '@lib/globalTypes';

function* getSalesmansWorker(action: Action<string>): SagaIterator {
  try {
    const res = yield call(salesmanApi.getSalesmans, action.payload);
    yield put(salesmanActions.setSalesmans(res.data));
  } catch (err) {
    console.log(err);
  }
}

function* postSalesmansWorker(action: Action<SalesmanPostPayload>): SagaIterator {
  try {
    yield call(salesmanApi.postSalesmans, action.payload);
    yield put(salesmanActions.salesmanPosted());
    yield put(salesmanActions.getSalesmans(action.payload.tt));
  } catch (err) {
    console.log(err);
  }
}

function* deleteSalesmansWorker(action: Action<Salesman>): SagaIterator {
  try {
    yield call(salesmanApi.deleteSalesmans, action.payload.id);
    yield put(salesmanActions.salesmanDeleted());
    yield put(salesmanActions.getSalesmans(action.payload.tt));
  } catch (err) {
    console.log(err);
  }
}

export function* salesmanWatcher(): SagaIterator {
  yield takeEvery(salesmanActions.getSalesmans.type, getSalesmansWorker);
  yield takeEvery(salesmanActions.deleteSalesman.type, deleteSalesmansWorker);
  yield takeEvery(salesmanActions.postSalesman.type, postSalesmansWorker);
}
