import { FixLater } from './../../globalTypes';
import { planesApi } from './planes.api';
import { SagaIterator } from '@redux-saga/types';
import { call, takeEvery, put } from 'redux-saga/effects';
import { getPlanes, planesUpdated, setError, setPlanes, updatePlanes } from './planes.slice';

function* getPlanesWorker(action: FixLater): SagaIterator {
  try {
    const res = yield call(planesApi.getPlanes, action.payload);
    yield put({ type: setPlanes.type, payload: res.data });
  } catch (e) {
    yield put({ type: setError.type });
  }
}

function* updatePlanesWorker(action: FixLater): SagaIterator {
  try {
    yield call(planesApi.updatePlanes, action.payload);
    yield put({ type: getPlanes.type, payload: action.payload.tt });
    yield put({ type: planesUpdated.type });
  } catch (e) {
    yield put({ type: setError.type });
  }
}

export function* planewWatcher(): SagaIterator {
  yield takeEvery(getPlanes.type, getPlanesWorker);
  yield takeEvery(updatePlanes.type, updatePlanesWorker);
}
