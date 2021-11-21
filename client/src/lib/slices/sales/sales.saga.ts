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
import { salesmanApi } from '../../api/salesman.api';

function* getSalesWorker(action: FixLater): SagaIterator {
  try {
    const salesRes = yield call(salesApi.getSales, action.payload);
    const salesmansRes = yield call(salesmanApi.getSalesmans, action.payload);
    const salesmansNames = salesmansRes.data.map((salesman: any) => salesman.name);
    const parsedSales: any = [];
    salesRes.data.forEach((item: any) => {
      parsedSales.push({ ...item, sales: parse(item.sales) });
    });
    const sales: any = [];
    parsedSales.forEach((salesItem: any) => {
      const items: any = [];
      const ttSales: any = [];
      salesItem.sales.forEach((item: any, index: number) => {
        if (index === 3) {
          ttSales.push(item);
        }
        if (salesmansNames.includes(item[0])) {
          items.push(item);
        }
      });
      sales.push({ ...salesItem, sales: items, ttSales });
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
    const sales = action.payload.sales.replace(/\n/g, '*+').replace(/\t/g, '*+').split('*').join();
    const payload = { ...action.payload, sales };
    console.log(payload);
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

function parse(input: string) {
  const inputToArray = input.split('+');
  let result: any[][] = [];
  let tmp: string[] = [];

  inputToArray.forEach((item, index) => {
    tmp.push(item.substring(0, item.length - 1));

    if ((index + 1) % 17 === 0) {
      result.push(tmp);
      tmp = [];
    }
  });

  result = result.map((resItem, index) => {
    if (index !== 0 && index !== 1) {
      return (resItem = resItem.map((subres, i) => {
        if (i !== 0) {
          const value = parseInt(subres.replace(/\s/g, ''));
          return isNaN(value) ? 0 : value;
        } else {
          return subres;
        }
      }));
    } else {
      return resItem;
    }
  });

  return result;
}
