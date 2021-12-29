import { LoadingStatuses } from '@lib/globalTypes';
import { RootState } from '@lib/store';
import { Shop } from '@lib/slices/shop';

export const allShops = (state: RootState): Shop[] | null => state.shops.shops;

export const status = (state: RootState): LoadingStatuses => state.shops.status;

export const currentShop = (state: RootState): Shop | null => state.shops.currentShop;

export const byCodeName = (tt: string | undefined) => (state: RootState): Shop => {
  if (!tt) {
    return { id: 0, name: '', shortName: '', name_1c: '', region: '' };
  }
  return state.shops.shops?.find((shop) => shop.name == tt) as Shop;
};
