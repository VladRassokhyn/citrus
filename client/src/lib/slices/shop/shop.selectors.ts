import { LoadingStatuses } from './../../globalTypes';
import { RootState } from './../../store';
import { Shop } from './shop.type';

export const allShops = (state: RootState): Shop[] | null => state.shops.shops;

export const status = (state: RootState): LoadingStatuses => state.shops.status;
