import { all } from 'redux-saga/effects';
import { authWather } from './slices/auth';
import { checklistWatcher } from './slices/checklist';
import { planewWatcher } from './slices/planes';
import { usersWatcher } from './slices/users';
import { salesmanWatcher } from './slices/salesman';
import { salesWatcher } from './slices/sales';
import { shopWatcher } from './slices/shop';
import { initializeWatcher } from './initialize.saga';

export function* rootSaga(): Generator {
  yield all([
    initializeWatcher(),
    usersWatcher(),
    authWather(),
    checklistWatcher(),
    planewWatcher(),
    salesmanWatcher(),
    salesWatcher(),
    shopWatcher(),
  ]);
}
