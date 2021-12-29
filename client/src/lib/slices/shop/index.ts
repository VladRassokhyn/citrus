import { allShops, status, byCodeName, currentShop } from './shop.selectors';
import {
  getShops,
  setShops,
  postShop,
  shopPosted,
  updateShop,
  shopUpdated,
  deleteShop,
  shopDeleted,
  setCurrentShop,
} from './shop.slice';

export const shopSelectors = {
  allShops,
  status,
  byCodeName,
  currentShop,
};
export const shopActions = {
  getShops,
  setShops,
  postShop,
  shopPosted,
  updateShop,
  shopUpdated,
  deleteShop,
  shopDeleted,
  setCurrentShop,
};
export { shopReducer } from './shop.slice';
export { shopWatcher } from './shops.saga';
export type { Shop, PostShopPayload, ShopInitialState } from './shop.type';
export { shopApi } from './shop.api';
