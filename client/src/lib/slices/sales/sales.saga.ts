import { Action, FixLater } from './../../globalTypes';
import { takeEvery, call, put } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/types';
import {
  getSales,
  setSales,
  postSales,
  salesPosted,
  updateSales,
  salesUpdated,
  deleteSales,
  salesDeleted,
} from './sales.slice';
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
    yield put({ type: setSales.type, payload: res.data });
  } catch (err) {
    console.log(err);
  }
}

function* salesPostWorker(action: Action<PostSalesPayload>): SagaIterator {
  try {
    const sales = action.payload.sales.replace(/\n/g, '*+').replace(/\t/g, '*+').split('*').join();
    const payload = { ...action.payload, sales };
    yield call(salesApi.postSales, payload);
    yield put({ type: salesPosted.type });
    yield put({ type: getSales.type, payload: action.payload });
  } catch (err) {
    console.log(err);
  }
}

function* salesUpdateWorker(action: Action<PutSalesPayload>): SagaIterator {
  try {
    const sales = action.payload.sales.replace(/\n/g, '*+').replace(/\t/g, '*+').split('*').join();
    const payload = { ...action.payload, sales };
    yield call(salesApi.putSales, payload);
    yield put({ type: salesUpdated.type });
    yield put({ type: getSales.type, payload: action.payload });
  } catch (err) {
    console.log(err);
  }
}

function* salesDeleteWorker(action: Action<DeleteSalesPayload>): SagaIterator {
  try {
    yield call(salesApi.deleteSales, action.payload.id);
    yield put({ type: getSales.type, payload: action.payload });
    yield put({ type: salesDeleted.type });
  } catch (err) {
    console.log(err);
  }
}

export function* salesWatcher(): SagaIterator {
  yield takeEvery(getSales.type, getSalesWorker);
  yield takeEvery(postSales.type, salesPostWorker);
  yield takeEvery(updateSales.type, salesUpdateWorker);
  yield takeEvery(deleteSales.type, salesDeleteWorker);
}
