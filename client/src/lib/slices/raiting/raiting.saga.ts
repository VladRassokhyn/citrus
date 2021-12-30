import { raitingActions, raitingApi } from '@lib/slices/raiting';
import { takeEvery, call, put } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/types';
import { Action } from '@lib/globalTypes';

function* getSalesWorker(action: Action<{ month: number; year: number }>): SagaIterator {
  try {
    const res = yield call(raitingApi.getSales, action.payload);
    const sales = res.data.filter((sale: any) => !!sale);
    yield put(raitingActions.setSales(sales));
  } catch (err) {
    put(raitingActions.setError());
  }
}

export function* raitingWatcher(): SagaIterator {
  yield takeEvery(raitingActions.getSales, getSalesWorker);
}
