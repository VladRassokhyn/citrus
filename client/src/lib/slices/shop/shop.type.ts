import { LoadingStatuses } from './../../globalTypes';

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
};

export type PostShopPayload = {
  name: string;
  shortName: string;
  name_1c: string;
};
