import { all } from 'redux-saga/effects';
import { authWather } from '../slices/auth/';
import { checklistWatcher } from '../slices/checklist';
import { daySalesWatcher } from '../slices/daySales';
import { planewWatcher } from '../slices/planes';
import { usersWatcher } from '../slices/users';
import { salesmanWatcher } from '../slices/salesman';

export function* rootSaga() {
  yield all([
    usersWatcher(),
    authWather(),
    checklistWatcher(),
    planewWatcher(),
    daySalesWatcher(),
    salesmanWatcher(),
  ]);
}
