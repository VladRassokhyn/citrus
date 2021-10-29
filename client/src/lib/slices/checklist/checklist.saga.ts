import { checklistsApi } from './../../api/checklists.api';
import { FixLater } from './../../globalTypes';
import { takeEvery, call, put } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/types';
import { getChecklists, setChecklists, setError } from './checklist.slice';
import { postNewChecklist } from '.';

function* getChecklistsWorker(): SagaIterator {
  try {
    const checklists = yield call(checklistsApi.getChecklists);
    yield put({ type: setChecklists.type, payload: checklists.data });
  } catch (err) {
    yield put({ type: setError.type });
  }
}

function* postChecklistWorker(action: FixLater): SagaIterator {
  try {
    yield call(checklistsApi.postNewChecklist, action.payload);
  } catch (err) {
    yield put({ type: setError.type });
  }
}

export function* checklistWatcher(): SagaIterator {
  yield takeEvery(getChecklists.type, getChecklistsWorker);
  yield takeEvery(postNewChecklist.type, postChecklistWorker);
}
