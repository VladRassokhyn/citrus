import { Shop } from './shop.type';
import { shopWatcher } from './shops.saga';
import { allShops, status, byCodeName } from './shop.selectors';
import {
  shopReducer,
  getShops,
  setShops,
  postShop,
  shopPosted,
  updateShop,
  shopUpdated,
  deleteShop,
  shopDeleted,
} from './shop.slice';

export const shopSelectors = {
  allShops,
  status,
  byCodeName,
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
};
export { shopReducer, shopWatcher };
export type { Shop };
