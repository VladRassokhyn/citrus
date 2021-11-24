import { FixLater } from './../../globalTypes';
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

function* getSalesWorker(action: FixLater): SagaIterator {
  try {
    const res = yield call(salesApi.getSales, action.payload);
    yield put({ type: setSales.type, payload: res.data });
  } catch (err) {
    console.log(err);
  }
}

function* salesPostWorker(action: FixLater): SagaIterator {
  try {
    const sales = action.payload.sales.replace(/\n/g, '*+').replace(/\t/g, '*+').split('*').join();
    const payload = { ...action.payload, sales };
    yield call(salesApi.postSales, payload);
    yield put({ type: salesPosted.type });
    yield put({ type: getSales.type, payload: action.payload.tt });
  } catch (err) {
    console.log(err);
  }
}

function* salesUpdateWorker(action: FixLater): SagaIterator {
  try {
    const sales = action.payload.sales.replace(/\n/g, '*+').replace(/\t/g, '*+').split('*').join();
    const payload = { ...action.payload, sales };
    yield call(salesApi.putSales, payload);
    yield put({ type: salesUpdated.type });
    yield put({ type: getSales.type, payload: action.payload.tt });
  } catch (err) {
    console.log(err);
  }
}

function* salesDeleteWorker(action: FixLater): SagaIterator {
  try {
    yield call(salesApi.deleteSales, action.payload.id);
    yield put({ type: salesDeleted.type });
    yield put({ type: getSales.type, payload: action.payload.tt.value });
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
