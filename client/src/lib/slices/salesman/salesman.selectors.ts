import { RootState } from '../../store';

export const selectAllSalesmans = (state: RootState) => state.salesman.salesmans;

export const selectSalesmanStatuses = (state: RootState) => ({
  getStatus: state.salesman.getStatus,
  postStatus: state.salesman.postStatus,
  deleteStatus: state.salesman.deleteStatus,
});
