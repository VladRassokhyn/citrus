import { Action } from '@lib/globalTypes';
import { takeEvery, call, put } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/types';
import { checklistActions, Checklist, checklistsApi } from '@lib/slices/checklist';

function* getChecklistsWorker(): SagaIterator {
  try {
    const checklists = yield call(checklistsApi.getChecklists);
    yield put(checklistActions.setChecklists(checklists.data));
  } catch (err) {
    yield put(checklistActions.setError());
  }
}

function* getChecklistByIdWorker(action: Action<string>): SagaIterator {
  try {
    const { data } = yield call(checklistsApi.getChecklistById, action.payload);
    yield put(checklistActions.setSingleChecklist(data));
  } catch (err) {
    yield put(checklistActions.setError());
  }
}

function* postChecklistWorker(action: Action<Checklist>): SagaIterator {
  try {
    yield call(checklistsApi.postNewChecklist, action.payload);
    yield put(checklistActions.newChecklistPosted());
    yield put(checklistActions.getChecklists());
  } catch (err) {
    yield put(checklistActions.setError());
  }
}

function* deleteChecklistWorker(action: Action<number>): SagaIterator {
  try {
    yield call(checklistsApi.deleteChecklist, action.payload);
    yield put(checklistActions.checklistDeleted());
    yield put(checklistActions.getChecklists());
  } catch (err) {
    yield put(checklistActions.setError());
  }
}

export function* checklistWatcher(): SagaIterator {
  yield takeEvery(checklistActions.getChecklists.type, getChecklistsWorker);
  yield takeEvery(checklistActions.postNewChecklist.type, postChecklistWorker);
  yield takeEvery(checklistActions.getSingleChecklist.type, getChecklistByIdWorker);
  yield takeEvery(checklistActions.deleteChecklist.type, deleteChecklistWorker);
}
