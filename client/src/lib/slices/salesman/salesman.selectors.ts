import { Sales, salesSelectors } from '@lib/slices/sales';
import { RootState } from '@lib/store';
import { LoadingStatuses } from '@lib/globalTypes';
import { Salesman } from '@lib/slices/salesman';

export const salesmans = (state: RootState): Salesman[] | null => state.salesman.salesmans;

export const status = (state: RootState): LoadingStatuses => state.salesman.status;

export const salesmanById = (salesmanId: string | number) => (state: RootState): Salesman =>
  state.salesman.salesmans?.find((man) => man.id === +salesmanId) as Salesman;

export const salesmanSales = (
  salesmanId: string | number,
  period: { from: number; to: number },
) => (state: RootState) => {
  if (!salesmanId) {
    return [] as Sales[];
  }
  const salesman = salesmanById(salesmanId)(state);
  const emptyDaySales = [salesman.name, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const sales = salesSelectors.salsesByRange(period.from, period.to)(state);
  const toRes: any = [];
  sales.forEach((sale) => {
    const daySales = sale.sales.find((sale) => sale[0] === salesman.name);
    if (!!daySales) {
      toRes.push({ ...sale, ttSales: daySales });
    } else {
      toRes.push({ ...sale, ttSales: emptyDaySales });
    }
  });
  return toRes as Sales[];
};
