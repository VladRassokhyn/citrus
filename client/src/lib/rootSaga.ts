import { all } from 'redux-saga/effects';
import { authWather } from '@lib/slices/auth';
import { checklistWatcher } from '@lib/slices/checklist';
import { planewWatcher } from '@lib/slices/planes';
import { usersWatcher } from '@lib/slices/users';
import { salesmanWatcher } from '@lib/slices/salesman';
import { salesWatcher } from '@lib/slices/sales';
import { shopWatcher } from '@lib/slices/shop';
import { todoWatcher } from '@lib/slices/todo';
import { raitingWatcher } from '@lib/slices/raiting';

export function* rootSaga(): Generator {
  yield all([
    usersWatcher(),
    authWather(),
    checklistWatcher(),
    planewWatcher(),
    salesmanWatcher(),
    salesWatcher(),
    shopWatcher(),
    todoWatcher(),
    raitingWatcher(),
  ]);
}
