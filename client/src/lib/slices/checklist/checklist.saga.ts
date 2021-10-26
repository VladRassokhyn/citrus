import { checklistsApi } from './../../api/checklists.api';
import { FixLater } from './../../globalTypes';
import { takeEvery, call, put } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/types';
import { getChecklists, setChecklists, setError } from './checklist.slice';

function* checklistsWorker(): SagaIterator {
  try {
    const checklists = yield call(checklistsApi.getChecklists);
    yield put({ type: setChecklists.type, payload: checklists });
  } catch (err) {
    yield put({ type: setError.type });
  }
}

export function* checklistWatcher(): SagaIterator {
  yield takeEvery(getChecklists.type, checklistsWorker);
}
