import { FixLater, Salesman } from './../../globalTypes';
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
import { salesApi } from '../../api/sales.api';

function* getSalesWorker(action: FixLater): SagaIterator {
  try {
    const res = yield call(salesApi.getSales, action.payload);
    const sales: any = [];
    res.data.forEach((item: any) => {
      sales.push({ ...item, sales: parse(item.sales) });
    });
    yield put({ type: setSales.type, payload: sales });
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
    yield call(salesApi.putSales, action.payload);
    yield put({ type: salesUpdated.type });
    yield put({ type: getSales.type, payload: action.payload.tt });
  } catch (err) {
    console.log(err);
  }
}

function* salesDeleteWorker(action: FixLater): SagaIterator {
  try {
    yield call(salesApi.deleteSales, action.payload);
    yield put({ type: salesDeleted.type });
    yield put({ type: getSales.type, payload: action.payload.tt });
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

function parse(input: string) {
  const inputToArray = input.split('+');
  const result: any = [];
  let tmp: any = [];

  inputToArray.forEach((item, index) => {
    tmp.push(item.substring(0, item.length - 1));
    if ((index + 1) % 17 === 0) {
      result.push(tmp);
      tmp = [];
    }
  });

  return result;
}
