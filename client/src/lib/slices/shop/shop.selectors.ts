import { LoadingStatuses } from './../../globalTypes';
import { RootState } from './../../store';
import { Shop } from './shop.type';

export const allShops = (state: RootState): Shop[] | null => state.shops.shops;

export const status = (state: RootState): LoadingStatuses => state.shops.status;

export const byCodeName = (tt: string | undefined) => (state: RootState): Shop => {
  if (!tt) {
    return { id: 0, name: '', shortName: '', name_1c: '' };
  }
  return state.shops.shops?.find((shop) => shop.name == tt) as Shop;
};
