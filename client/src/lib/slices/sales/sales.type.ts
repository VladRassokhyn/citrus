import { LoadingStatuses } from './../../globalTypes';

export type Sales = {
  id: number;
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
  month: number;
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

export interface GetSalesPayload {
  tt: string;
  month: string | number;
  year: string | number;
}

export interface PostSalesPayload extends GetSalesPayload {
  day: string;
  sales: string;
}

export interface PutSalesPayload extends GetSalesPayload {
  day: string;
  sales: string;
  id: number;
}

export interface DeleteSalesPayload extends GetSalesPayload {
  id: number;
}
