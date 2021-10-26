import { all } from 'redux-saga/effects';
import { authWather } from '../slices/auth/auth.saga';
import { checklistWatcher } from '../slices/checklist';
import { usersWatcher } from '../slices/users/users.saga';

export function* rootSaga() {
  yield all([usersWatcher(), authWather(), checklistWatcher()]);
}
