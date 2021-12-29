import { shopApi, shopActions, PostShopPayload, Shop } from '@lib/slices/shop';
import { takeEvery, call, put } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/types';
import { Action } from '@lib/globalTypes';

function* getWorker(): SagaIterator {
  try {
    const res = yield call(shopApi.getShops);
    yield put(shopActions.setShops(res.data));
  } catch (e) {
    console.log(e);
  }
}

function* postWorker(action: Action<PostShopPayload>): SagaIterator {
  try {
    yield call(shopApi.postShops, action.payload);
    yield put(shopActions.shopPosted());
    yield put(shopActions.getShops());
  } catch (e) {
    console.log(e);
  }
}

function* updateWorker(action: Action<Shop>): SagaIterator {
  try {
    yield call(shopApi.updateShops, action.payload);
    yield put(shopActions.shopUpdated());
    yield put(shopActions.getShops());
  } catch (e) {
    console.log(e);
  }
}

function* deleteWorker(action: Action<number>): SagaIterator {
  try {
    yield call(shopApi.deleteShops, action.payload);
    yield put(shopActions.shopDeleted());
    yield put(shopActions.getShops());
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
