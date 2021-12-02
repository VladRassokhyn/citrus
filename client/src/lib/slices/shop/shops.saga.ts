import { shopApi } from './shop.api';
import { shopActions } from './index';
import { takeEvery, call, put } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/types';
import { Action } from '../../globalTypes';
import { PostShopPayload, Shop } from './shop.type';

function* getWorker(): SagaIterator {
  try {
    const shops = yield call(shopApi.getShops);
    yield put(shopActions.setShops(shops));
  } catch (e) {
    console.log(e);
  }
}

function* postWorker(action: Action<PostShopPayload>): SagaIterator {
  try {
    yield call(shopApi.postShops, action.payload);
    yield put(shopActions.shopPosted());
  } catch (e) {
    console.log(e);
  }
}

function* updateWorker(action: Action<Shop>): SagaIterator {
  try {
    yield call(shopApi.updateShops, action.payload);
    yield put(shopActions.shopUpdated());
  } catch (e) {
    console.log(e);
  }
}

function* deleteWorker(action: Action<number>): SagaIterator {
  try {
    yield call(shopApi.deleteShops, action.payload);
    yield put(shopActions.shopDeleted());
  } catch (e) {
    console.log(e);
  }
}

export function* shopWatcher() {
  yield takeEvery(shopActions.getShops.type, getWorker);
  yield takeEvery(shopActions.postShop.type, postWorker);
  yield takeEvery(shopActions.updateShop.type, updateWorker);
  yield takeEvery(shopActions.deleteShop.type, deleteWorker);
}
