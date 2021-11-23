import { Salesman } from '../../globalTypes';
import { RootState } from '../../store';
import { SalesmanStatuses } from './salesman.type';

export const selectAllSalesmans = (state: RootState): Salesman[] | null => state.salesman.salesmans;

export const selectSalesmanStatuses = (state: RootState): SalesmanStatuses => ({
  getStatus: state.salesman.getStatus,
  postStatus: state.salesman.postStatus,
  deleteStatus: state.salesman.deleteStatus,
});
