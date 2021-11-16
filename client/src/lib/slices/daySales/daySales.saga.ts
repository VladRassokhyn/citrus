import { FixLater } from './../../globalTypes';
import { takeEvery, call, put } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/types';
import { getDaySales, setDaySales } from './daySales.slice';
import { daySalesApi } from '../../api/daySales.api';

function* daySalesWorker(action: FixLater): SagaIterator {
  try {
    const res = yield call(daySalesApi.getDaySales, action.payload);
    yield put({ type: setDaySales.type, payload: res.data });
  } catch (err) {
    console.log(err);
  }
}

export function* daySalesWatcher(): SagaIterator {
  yield takeEvery(getDaySales.type, daySalesWorker);
}
