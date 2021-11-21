import { LoadingStatuses } from './../../globalTypes';

export type Sales = {
  id?: number;
  tt?: { label: string; value: string };
  day: string;
  ttSales: [
    string,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
  ][];
  sales: [
    string,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
  ][];
};

export type SalesState = {
  getStatus: LoadingStatuses;
  postStatus: LoadingStatuses;
  updateStatus: LoadingStatuses;
  deleteStatus: LoadingStatuses;
  daySales: Sales[] | null;
};
