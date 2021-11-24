import { DaySales } from '../slices/daySales';

type Arg = number | undefined | null;

function getDays() {
  const dayCount = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const day = new Date().getDate();
  return { dayCount, day };
}

export function mounthSales(sales: DaySales[] | null | undefined): DaySales {
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

export function forecastSumm(currentSales: Arg, d?: Arg): number {
  if (!currentSales) {
    return 0;
  }
  const { dayCount, day } = getDays();
  return (currentSales / (d ? d : day)) * dayCount;
}

export function forecastPercent(sales: Arg, plane: Arg, d?: number): number {
  if (!sales || !plane) {
    return 0;
  }
  return +((forecastSumm(sales, d) / plane) * 100).toFixed(2);
}

export function growthForecast(plane: Arg, salesByDay: Arg, salesByMounth: Arg): number {
  if (!plane || !salesByDay || !salesByMounth) {
    return 0;
  }
  const { day } = getDays();
  return +(
    forecastPercent(salesByMounth, plane) -
    forecastPercent(salesByMounth - salesByDay, plane, day - 1)
  ).toFixed(2);
}

export function ratio(from: Arg, to: Arg): number {
  if (!from || !to) {
    return 0;
  }
  return +((from / to) * 100).toFixed(2);
}

export function growthRatio(dayFrom: Arg, perFrom: Arg, dayTo: Arg, perTo: Arg): number {
  if (!dayFrom || !perFrom || !dayTo || !perTo) {
    return 0;
  }
  return +(ratio(perFrom, perTo) - ratio(perFrom - dayFrom, perTo - dayTo)).toFixed(2);
}

export function dayPlane(sales: Arg, plane: Arg): number {
  if (!sales || !plane) {
    return 0;
  }
  const { dayCount, day } = getDays();
  return +((plane - sales) / (dayCount - day)).toFixed(0);
}
