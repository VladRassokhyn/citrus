import { LoadingStatuses } from '@lib/globalTypes';

export type ShopInitialState = {
  status: LoadingStatuses;
  shops: Shop[] | null;
  currentShop: Shop | null;
};

export type Shop = {
  id: number;
  name: string;
  shortName: string;
  name_1c: string;
  region: string;
};

export type PostShopPayload = {
  name: string;
  shortName: string;
  name_1c: string;
  region: string;
};
