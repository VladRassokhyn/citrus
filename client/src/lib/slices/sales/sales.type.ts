import { LoadingStatuses } from './../../globalTypes';

export type Sales = {
  id?: number;
  tt?: { label: string; value: string };
  day: string;
  sales: string[][];
};

export type SalesState = {
  getStatus: LoadingStatuses;
  postStatus: LoadingStatuses;
  updateStatus: LoadingStatuses;
  deleteStatus: LoadingStatuses;
  daySales: Sales[] | null;
};
