import { Action } from './../../globalTypes';
import { takeEvery, call, put } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/types';
import { salesActions } from '../sales';
import { salesApi } from './sales.api';
import {
  DeleteSalesPayload,
  GetSalesPayload,
  PostSalesPayload,
  PutSalesPayload,
} from './sales.type';

function* getSalesWorker(action: Action<GetSalesPayload>): SagaIterator {
  try {
    const res = yield call(salesApi.getSales, action.payload);
    yield put(salesActions.setSales(res.data));
  } catch (err) {
    console.log(err);
  }
}

function* salesPostWorker(action: Action<PostSalesPayload>): SagaIterator {
  try {
    const sales = action.payload.sales.replace(/\n/g, '*+').replace(/\t/g, '*+').split('*').join();
    const payload = { ...action.payload, sales };
    yield call(salesApi.postSales, payload);
    yield put(salesActions.salesPosted());
    yield put(salesActions.getSales(action.payload));
  } catch (err) {
    console.log(err);
  }
}

function* salesUpdateWorker(action: Action<PutSalesPayload>): SagaIterator {
  try {
    const sales = action.payload.sales.replace(/\n/g, '*+').replace(/\t/g, '*+').split('*').join();
    const payload = { ...action.payload, sales };
    yield call(salesApi.putSales, payload);
    yield put(salesActions.salesUpdated());
    yield put(salesActions.getSales(action.payload));
  } catch (err) {
    console.log(err);
  }
}

function* salesDeleteWorker(action: Action<DeleteSalesPayload>): SagaIterator {
  try {
    yield call(salesApi.deleteSales, action.payload.id);
    yield put(salesActions.getSales(action.payload));
    yield put(salesActions.salesDeleted());
  } catch (err) {
    console.log(err);
  }
}

export function* salesWatcher(): SagaIterator {
  yield takeEvery(salesActions.getSales.type, getSalesWorker);
  yield takeEvery(salesActions.postSales.type, salesPostWorker);
  yield takeEvery(salesActions.updateSales.type, salesUpdateWorker);
  yield takeEvery(salesActions.deleteSales.type, salesDeleteWorker);
}
