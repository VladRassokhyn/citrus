import { all } from 'redux-saga/effects';
import { authWather } from '../slices/auth/';
import { checklistWatcher } from '../slices/checklist';
import { planewWatcher } from '../slices/planes';
import { usersWatcher } from '../slices/users/';

export function* rootSaga() {
  yield all([
    usersWatcher(),
    authWather(),
    checklistWatcher(),
    planewWatcher(),
  ]);
}
