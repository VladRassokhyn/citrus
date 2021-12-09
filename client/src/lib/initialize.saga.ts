import { shopActions } from './slices/shop/index';
import { SagaIterator } from '@redux-saga/types';
import { authApi } from './slices/auth/auth.api';
import { takeEvery, call, put } from 'redux-saga/effects';
import { authActions } from './slices/auth';
import { usersApi } from './slices/users/users.api';
import { shopApi } from './slices/shop/shop.api';
import { Shop } from './slices/shop';

function* initializeWorker(): SagaIterator {
  try {
    const authRes = yield call(authApi.getAuth);
    const shopsRes = yield call(shopApi.getShops);

    if (authRes.status === 401) {
      yield put(authActions.setAuthError());
    } else {
      const userRes = yield call(usersApi.getUserById, authRes.data.userId);

      if (!userRes) {
        yield put(authActions.setAuthError());
      } else {
        const tt = shopsRes.data.find((tt: Shop) => tt.name === userRes.data.tt);
        const user = { ...userRes.data, tt: { label: tt.name_1c, value: tt.name } };

        yield put(shopActions.setShops(shopsRes.data));
        yield put(shopActions.setCurrentShop(tt));
        yield put(authActions.setAuthUser(user));
        yield put(authActions.setAuth());
      }
    }
  } catch (err) {
    yield put(authActions.setAuthError());
  }
}

export function* initializeWatcher() {
  yield takeEvery(authActions.getAuth, initializeWorker);
}
