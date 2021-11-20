import { LoadingStatuses } from './../../globalTypes';

export type DaySales = {
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
  sales: DaySales[] | null;
};
