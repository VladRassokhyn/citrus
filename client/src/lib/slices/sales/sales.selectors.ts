import { RootState } from './../../store';
import { Sales, SalesStatuses } from './sales.type';

export const selectAllSales = (state: RootState): Sales[] | null => state.sales.daySales;

export const selectSalesStatuses = (state: RootState): SalesStatuses => ({
  getStatus: state.daySales.getStatus,
  postStatus: state.daySales.postStatus,
  updateStatus: state.daySales.updateStatus,
});

export const selectSalesByDate = (day: string) => (state: RootState): Sales | null =>
  state.sales.daySales?.filter((sales) => sales.day === day)[0] || null;
