import { LoadingStatuses } from '../../globalTypes';

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
  checklists: string[];
};
