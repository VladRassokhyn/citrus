import { LoadingStatuses, Salesman } from '../../globalTypes';

export type SalesmanState = {
  getStatus: LoadingStatuses;
  postStatus: LoadingStatuses;
  deleteStatus: LoadingStatuses;
  salesmans: Salesman[] | null;
};
