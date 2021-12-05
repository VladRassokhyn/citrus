import { Shop } from './shop.type';
import { shopWatcher } from './shops.saga';
import { allShops, status, byCodeName, currentShop } from './shop.selectors';
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
export { shopReducer, shopWatcher };
export type { Shop };
