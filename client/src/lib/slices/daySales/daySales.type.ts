import { LoadingStatuses } from './../../globalTypes';

export type Sales = {
  id?: number;
  tt?: { value: string; label: string };
  day: string;
  cm: number;
  cz: number;
  to: number;
  ca: number;
};

export type DaySalesState = {
  getStatus: LoadingStatuses;
  postStatus: LoadingStatuses;
  updateStatus: LoadingStatuses;
  deleteStatus: LoadingStatuses;
  sales: Sales[] | null;
};
