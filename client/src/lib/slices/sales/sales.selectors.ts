import { LoadingStatuses } from '@lib/globalTypes';
import { RootState } from '@lib/store';
import { Sales } from '@lib/slices/sales';

export const sales = (state: RootState): Sales[] | null => state.sales.daySales;

export const status = (state: RootState): LoadingStatuses => state.sales.status;

export const salesByDate = (day: string) => (state: RootState): Sales | null =>
  state.sales.daySales?.filter((sales) => sales.day === day)[0] || null;

export const monthAndYear = (state: RootState): { month: number; year: number } => ({
  year: state.sales.year,
  month: state.sales.month,
});

export const salesLength = (state: RootState): number => {
  if (!state.sales.daySales) {
    return 1;
  } else {
    return state.sales.daySales.length;
  }
};

export const salsesByRange = (from: number, to: number) => (state: RootState): Sales[] => {
  return state.sales.daySales?.filter((salesItem) => {
    const salesDay = parseInt(salesItem.day.split('.')[0]);
    if (salesDay >= from && salesDay <= to) {
      return true;
    }
  }) as Sales[];
};
