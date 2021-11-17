import { FixLater } from './../../globalTypes';
import { takeEvery, call, put } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/types';
import {
  daySalesPosted,
  daySalesUpdated,
  getDaySales,
  postDaySales,
  setDaySales,
  updateDaySales,
} from './daySales.slice';
import { daySalesApi } from '../../api/daySales.api';

function* daySalesWorker(action: FixLater): SagaIterator {
  try {
    const res = yield call(daySalesApi.getDaySales, action.payload);
    yield put({ type: setDaySales.type, payload: res.data });
  } catch (err) {
    console.log(err);
  }
}

function* daySalesPostWorker(action: FixLater): SagaIterator {
  try {
    console.log(action.payload);
    yield call(daySalesApi.postDaySales, action.payload);
    yield put({ type: daySalesPosted.type });
    yield put({ type: getDaySales.type, payload: action.payload.tt });
  } catch (err) {
    console.log(err);
  }
}

function* daySalesUpdateWorker(action: FixLater): SagaIterator {
  try {
    yield call(daySalesApi.putDaySales, action.payload);
    yield put({ type: daySalesUpdated.type });
    yield put({ type: getDaySales.type, payload: action.payload.tt });
  } catch (err) {
    console.log(err);
  }
}

export function* daySalesWatcher(): SagaIterator {
  yield takeEvery(getDaySales.type, daySalesWorker);
  yield takeEvery(postDaySales.type, daySalesPostWorker);
  yield takeEvery(updateDaySales.type, daySalesUpdateWorker);
}
