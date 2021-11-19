import { RootState } from './../../store';

export const selectAllSales = (state: RootState) => state.sales.daySales;

export const selectSalesStatuses = (state: RootState) => ({
  getStatus: state.daySales.getStatus,
  postStatus: state.daySales.postStatus,
  updateStatus: state.daySales.updateStatus,
});
