import { RootState } from './../../store';

export const selectAllSales = (state: RootState) => state.sales.daySales;

export const selectSalesStatuses = (state: RootState) => ({
  getStatus: state.daySales.getStatus,
  postStatus: state.daySales.postStatus,
  updateStatus: state.daySales.updateStatus,
});

export const selectSalesByDate = (day: string) => (state: RootState) =>
  state.sales.daySales?.filter((sales) => sales.day === day)[0];
