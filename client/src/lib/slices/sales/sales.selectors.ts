import { RootState } from './../../store';

export const selectAllSales = (state: RootState) => state.daySales.sales;

export const selectSalesStatuses = (state: RootState) => ({
  getStatus: state.daySales.getStatus,
  postStatus: state.daySales.postStatus,
  updateStatus: state.daySales.updateStatus,
});
