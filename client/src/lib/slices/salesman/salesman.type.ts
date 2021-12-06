import { LoadingStatuses } from '../../globalTypes';

export type SalesmanState = {
  status: LoadingStatuses;
  salesmans: Salesman[] | null;
};

export type Salesman = {
  name: string;
  id: number;
  tt: string;
};

export type SalesmanPostPayload = {
  name: string;
  tt: string;
};
