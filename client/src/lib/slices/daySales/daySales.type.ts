import { LoadingStatuses } from './../../globalTypes';

export type Sales = {
  id?: number;
  tt?: string;
  cm: number;
  cz: number;
  to: number;
  ca: number;
};

export type DaySalesState = {
  getStatus: LoadingStatuses;
  sales: Sales[] | null;
};
