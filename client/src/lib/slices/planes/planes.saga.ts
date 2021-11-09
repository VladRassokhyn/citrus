import { FixLater } from './../../globalTypes';
import { planesApi } from './../../api/planesApi';
import { SagaIterator } from '@redux-saga/types';
import { call, takeEvery, put } from 'redux-saga/effects';
import { getPlanes, setError, setPlanes } from './planes.slice';

function* getPlanesWorker(action: FixLater): SagaIterator {
  try {
    const res = yield call(planesApi.getPlanes, action.payload);
    yield put({ type: setPlanes.type, payload: res.data });
  } catch (e) {
    yield put({ type: setError.type });
  }
}

export function* planewWatcher() {
  yield takeEvery(getPlanes.type, getPlanesWorker);
}
