import { LoadingStatuses } from '@lib/globalTypes';

export type Sales = {
  id: number;
  tt: { label: string; value: string };
  day: string;
  ttSales: SalesTuple;
  sales: SalesTuple[];
  createdAt: Date;
  updatedAt: Date;
};

export type SalesState = {
  status: LoadingStatuses;
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

export interface PutSalesPayload extends PostSalesPayload {
  id: number;
}

export interface DeleteSalesPayload extends GetSalesPayload {
  id: number;
}

export enum SalesIndexes {
  NAME = 0,
  DEVICES = 1,
  CM = 8,
  CZ = 10,
  CA = 12,
  TO = 14,
}

export type SalesTuple = [
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
  number,
  number,
];
