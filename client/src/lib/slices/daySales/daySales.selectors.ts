import { RootState } from './../../store';
import { DaySales, DaySalesStatuses } from './daySales.type';

export const selectAllDaySales = (state: RootState): DaySales[] | null => state.daySales.sales;

export const selectDaySalesStatuses = (state: RootState): DaySalesStatuses => ({
  getStatus: state.daySales.getStatus,
  postStatus: state.daySales.postStatus,
  updateStatus: state.daySales.updateStatus,
});
