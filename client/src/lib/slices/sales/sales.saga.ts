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
  Sales,
} from './sales.type';
import { shopApi } from '../shop/shop.api';
import { Shop } from '../shop';

function* getSalesWorker(action: Action<GetSalesPayload>): SagaIterator {
  try {
    const salesRes = yield call(salesApi.getSales, action.payload);

    const shopsRes = yield call(shopApi.getShops);
    const tt = shopsRes.data.find((tt: Shop) => tt.name === action.payload.tt);
    const sales = salesRes.data.map((item: Sales) => ({
      ...item,
      tt: { value: tt.name, label: tt.name_1c },
    }));
    yield put(salesActions.setSales(sales));
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
