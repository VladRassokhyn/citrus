import { Action, FixLater, TT } from './../../globalTypes';
import { planesApi } from './planes.api';
import { SagaIterator } from '@redux-saga/types';
import { call, takeEvery, put } from 'redux-saga/effects';
import { planesActions } from '../planes';
import { Planes } from './planes.type';

function* getPlanesWorker(action: Action<TT>): SagaIterator {
  try {
    const res = yield call(planesApi.getPlanes, action.payload);
    yield put(planesActions.setPlanes(res.data));
  } catch (e) {
    yield put(planesActions.setError());
  }
}

function* updatePlanesWorker(action: Action<Planes>): SagaIterator {
  try {
    yield call(planesApi.updatePlanes, action.payload);
    yield put(planesActions.getPlanes(action.payload.tt.value));
    yield put(planesActions.planesUpdated());
  } catch (e) {
    yield put(planesActions.setError());
  }
}

export function* planewWatcher(): SagaIterator {
  yield takeEvery(planesActions.getPlanes.type, getPlanesWorker);
  yield takeEvery(planesActions.updatePlanes.type, updatePlanesWorker);
}
