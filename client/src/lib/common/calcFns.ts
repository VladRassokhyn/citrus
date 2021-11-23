import { DaySales } from '../slices/daySales';

function getDays() {
  const dayCount = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const day = new Date().getDate();
  return { dayCount, day };
}

export function calcMounthSales(sales: DaySales[] | null | undefined): DaySales {
  if (!sales || sales.length === 0) {
    return { cm: 0, ca: 0, cz: 0, to: 0, tt: { value: 'no tt', label: 'no tt' }, id: 0, day: '' };
  }
  const mounthSales: DaySales = {
    cm: 0,
    cz: 0,
    ca: 0,
    to: 0,
    tt: sales[0].tt,
    id: sales[0].id,
    day: '',
  };
  sales.forEach((sale) => {
    mounthSales.cm += sale.cm;
    mounthSales.cz += sale.cz;
    mounthSales.to += sale.to;
    mounthSales.ca += sale.ca;
  });

  return mounthSales;
}

export function calcForecastSumm(currentSales: number): number {
  const { dayCount, day } = getDays();
  return (currentSales / day) * dayCount;
}

export function calcForecastPercent(
  sales: number | null | undefined,
  plane: number | null | undefined,
): number {
  if (!sales || !plane) {
    return 0;
  }
  return +((calcForecastSumm(sales) / plane) * 100).toFixed();
}
