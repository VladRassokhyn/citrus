import { Action } from './../../globalTypes';
import { planesApi } from './planes.api';
import { SagaIterator } from '@redux-saga/types';
import { call, takeEvery, put } from 'redux-saga/effects';
import { planesActions } from '../planes';
import { GetPlanesPayload, Planes } from './planes.type';

function* getPlanesWorker(action: Action<GetPlanesPayload>): SagaIterator {
  try {
    const res = yield call(planesApi.getPlanes, action.payload);
    yield put(planesActions.setPlanes(res.data));
  } catch (e) {
    yield put(planesActions.setError());
  }
}

function* updatePlanesWorker(action: Action<{ planes: Planes; tt: string }>): SagaIterator {
  try {
    yield call(planesApi.updatePlanes, action.payload.planes);
    yield put(
      planesActions.getPlanes({
        tt: action.payload.tt,
        month: action.payload.planes.month,
        year: action.payload.planes.year,
      }),
    );
    yield put(planesActions.planesUpdated());
  } catch (e) {
    yield put(planesActions.setError());
  }
}

function* postPlanesWorker(action: Action<{ planes: Planes; tt: string }>): SagaIterator {
  try {
    yield call(planesApi.postPlanes, action.payload.planes);
    yield put(
      planesActions.getPlanes({
        tt: action.payload.tt,
        month: action.payload.planes.month,
        year: action.payload.planes.year,
      }),
    );
    yield put(planesActions.planesPosted());
  } catch (err) {
    yield put(planesActions.setError());
  }
}

export function* planewWatcher(): SagaIterator {
  yield takeEvery(planesActions.getPlanes.type, getPlanesWorker);
  yield takeEvery(planesActions.updatePlanes.type, updatePlanesWorker);
  yield takeEvery(planesActions.postPlanes.type, postPlanesWorker);
}
