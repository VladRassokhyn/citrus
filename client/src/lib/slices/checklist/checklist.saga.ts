import { checklistsApi } from './../../api/checklists.api';
import { FixLater } from './../../globalTypes';
import { takeEvery, call, put } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/types';
import {
  getChecklists,
  getSingleChecklist,
  newChecklistPosted,
  setChecklists,
  setError,
  setSingleChecklist,
  checklistDeleted,
  deleteChecklist,
} from './checklist.slice';
import { postNewChecklist } from '.';

function* getChecklistsWorker(): SagaIterator {
  try {
    const checklists = yield call(checklistsApi.getChecklists);
    yield put({ type: setChecklists.type, payload: checklists.data });
  } catch (err) {
    yield put({ type: setError.type });
  }
}

function* getCHecklistByIdWorker(action: FixLater): SagaIterator {
  try {
    const { data } = yield call(checklistsApi.getChecklistById, action.payload);
    yield put({ type: setSingleChecklist.type, payload: data });
  } catch (err) {
    yield put({ type: setError.type });
  }
}

function* postChecklistWorker(action: FixLater): SagaIterator {
  try {
    yield call(checklistsApi.postNewChecklist, action.payload);
    yield put({ type: newChecklistPosted.type });
    yield put({ type: getChecklists.type });
  } catch (err) {
    yield put({ type: setError.type });
  }
}

function* deleteChecklistWorker(action: FixLater): SagaIterator {
  try {
    yield call(checklistsApi.deleteChecklist, action.payload);
    yield put({ type: checklistDeleted.type });
  } catch (err) {
    yield put({ type: setError.type });
  }
}

export function* checklistWatcher(): SagaIterator {
  yield takeEvery(getChecklists.type, getChecklistsWorker);
  yield takeEvery(postNewChecklist.type, postChecklistWorker);
  yield takeEvery(getSingleChecklist.type, getCHecklistByIdWorker);
  yield takeEvery(deleteChecklist.type, deleteChecklistWorker);
}
