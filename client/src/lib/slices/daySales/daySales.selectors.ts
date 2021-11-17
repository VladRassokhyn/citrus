import { RootState } from './../../store';

export const selectAllDaySales = (state: RootState) => state.daySales.sales;

export const selectDaySalesStatuses = (state: RootState) => ({
  getStatus: state.daySales.getStatus,
  postStatus: state.daySales.postStatus,
  updateStatus: state.daySales.updateStatus,
});
