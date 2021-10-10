export type FixLater = any;

export enum LoadingStatuses {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type SalesmanState = {
  items: Salesman[];
  status: LoadingStatuses;
  CRUDstatus: LoadingStatuses;
  error: any;
};

export type Salesman = {
  id: string;
  name: string;
  lastname: string;
};
