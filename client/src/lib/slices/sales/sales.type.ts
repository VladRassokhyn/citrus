import { LoadingStatuses } from './../../globalTypes';

export type Sales = {
  id?: number;
  tt: { label: string; value: string };
  day: string;
  ttSales: (string | number)[];
  sales: (string | number)[][];
};

export type SalesState = {
  getStatus: LoadingStatuses;
  postStatus: LoadingStatuses;
  updateStatus: LoadingStatuses;
  deleteStatus: LoadingStatuses;
  mounth: number;
  year: number;
  daySales: Sales[] | null;
};

export type SalesResponse = {
  day: string;
  id: number;
  sales: string;
  tt: string;
}[];

export type SalesStatuses = {
  getStatus: LoadingStatuses;
  postStatus: LoadingStatuses;
  updateStatus: LoadingStatuses;
};

export type SalesPayload = {
  id?: number;
  day: string;
  tt: string;
  sales: string;
};

export type GetSalesPayload = {
  tt: string;
  mounth: number;
  year: number;
};
