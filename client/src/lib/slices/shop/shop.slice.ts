import { Action, LoadingStatuses } from './../../globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import { PostShopPayload, Shop, ShopInitialState } from './shop.type';

const initialState: ShopInitialState = {
  status: LoadingStatuses.IDLE,
  shops: null,
  currentShop: null,
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    getShops(state) {
      state.status = LoadingStatuses.LOADING;
    },
    setShops(state, action: Action<Shop[]>) {
      state.shops = action.payload;
      state.status = LoadingStatuses.SUCCESS;
    },
    setCurrentShop(state, action: Action<Shop>) {
      state.currentShop = action.payload;
    },
    postShop(state, action: Action<PostShopPayload>) {
      state.status = LoadingStatuses.LOADING;
    },
    shopPosted(state) {
      state.status = LoadingStatuses.SUCCESS;
    },
    updateShop(state, action: Action<Shop>) {
      state.status = LoadingStatuses.LOADING;
    },
    shopUpdated(state) {
      state.status = LoadingStatuses.SUCCESS;
    },
    deleteShop(state, action: Action<{ id: number }>) {
      state.status = LoadingStatuses.LOADING;
    },
    shopDeleted(state) {
      state.status = LoadingStatuses.SUCCESS;
    },
  },
});

export const {
  getShops,
  setShops,
  postShop,
  shopPosted,
  updateShop,
  shopUpdated,
  deleteShop,
  shopDeleted,
  setCurrentShop,
} = shopSlice.actions;

export const shopReducer = shopSlice.reducer;
