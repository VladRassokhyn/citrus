import { RootState } from './../../store';
import { Sales, SalesStatuses } from './sales.type';

export const selectAllSales = (state: RootState): Sales[] | null => state.sales.daySales;

export const selectSalesStatuses = (state: RootState): SalesStatuses => ({
  getStatus: state.sales.getStatus,
  postStatus: state.sales.postStatus,
  updateStatus: state.sales.updateStatus,
});

export const selectSalesByDate = (day: string) => (state: RootState): Sales | null =>
  state.sales.daySales?.filter((sales) => sales.day === day)[0] || null;

export const selectMonth = (state: RootState): { month: number; year: number } => ({
  year: state.sales.year,
  month: state.sales.month,
});

export const selectSalesLength = (state: RootState): number => {
  if (!state.sales.daySales) {
    return 1;
  } else {
    return state.sales.daySales.length;
  }
};

export const selectSalsesByRange = (from: number, to: number) => (state: RootState): Sales[] => {
  return state.sales.daySales?.filter((salesItem) => {
    const salesDay = parseInt(salesItem.day.split('.')[0]);
    if (salesDay >= from && salesDay <= to) {
      return true;
    }
  }) as Sales[];
};
