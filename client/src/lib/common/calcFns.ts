import { DaySales } from '../slices/daySales';
import { Sales } from '../slices/sales/sales.type';

type Arg = number | string | undefined | null;

export const getCalcFns = (argDay?: number | string, argMonth?: number | string) => {
  const day = argDay ? +argDay : new Date().getDay();
  const month = argMonth ? +argMonth : new Date().getMonth();
  const dayCount = new Date(new Date().getFullYear(), +month + 1, 0).getDate();
  return {
    monthSalesNew: function (sales: Sales[] | null | undefined): Sales {
      const newSales: Sales = {
        id: 0,
        tt: { value: '', label: '' },
        day: '',
        ttSales: [],
        sales: [],
      };
      if (!sales) return newSales;

      sales.forEach((salesItem) => {
        salesItem.ttSales.forEach((ttSales, i) => {
          if (i !== 0) {
            newSales.ttSales[i] = newSales.ttSales[i]
              ? parseInt(newSales.ttSales[i] as string) + parseInt(ttSales as string)
              : parseInt(ttSales as string);
          } else {
            newSales.ttSales[i] = ttSales;
          }
        });

        salesItem.sales.forEach((salesman) => {
          newSales.sales.push(salesman);
        });
      });

      const namesBufer: string[] = [];
      const salesBufer: (string | number)[][] = [];

      newSales.sales.forEach((salesman) => {
        if (!namesBufer.includes(salesman[0] as string)) {
          namesBufer.push(salesman[0] as string);
          salesBufer.push(salesman);
        } else {
          salesBufer.forEach((buferItem, itemIndex) => {
            if (buferItem[0] === salesman[0]) {
              const newItem = [buferItem[0]];
              buferItem.forEach((item, i) => {
                if (i !== 0) {
                  newItem.push(+salesman[i] + +item);
                }
              });
              salesBufer[itemIndex] = newItem;
            }
          });
        }
      });

      newSales.sales = salesBufer;

      return newSales;
    },

    monthSales: function (sales: DaySales[] | null | undefined): DaySales {
      if (!sales || sales.length === 0) {
        return {
          cm: 0,
          ca: 0,
          cz: 0,
          to: 0,
          tt: { value: 'no tt', label: 'no tt' },
          id: 0,
          day: '',
        };
      }
      const monthSales: DaySales = {
        cm: 0,
        cz: 0,
        ca: 0,
        to: 0,
        tt: sales[0].tt,
        id: sales[0].id,
        day: '',
      };
      sales.forEach((sale) => {
        monthSales.cm += sale.cm;
        monthSales.cz += sale.cz;
        monthSales.to += sale.to;
        monthSales.ca += sale.ca;
      });

      return monthSales;
    },

    forecastSumm: function (currentSales: Arg, d?: Arg): number {
      if (!currentSales || typeof currentSales === 'string' || typeof d === 'string') {
        return 0;
      }
      return (currentSales / (d ? d : day)) * dayCount;
    },

    forecastPercent: function (sales: Arg, plane: Arg, d?: number): number {
      if (!sales || !plane || typeof plane === 'string') {
        return 0;
      }
      return +((this.forecastSumm(sales, d) / plane) * 100).toFixed(2);
    },

    growthForecast: function (plane: Arg, salesByDay: Arg, salesBymonth: Arg, d?: number): number {
      if (
        !plane ||
        !salesByDay ||
        !salesBymonth ||
        typeof salesByDay === 'string' ||
        typeof salesBymonth === 'string'
      ) {
        return 0;
      }
      return +(
        this.forecastPercent(salesBymonth, plane, day) -
        this.forecastPercent(salesBymonth - salesByDay, plane, d ? d - 1 : day - 1)
      ).toFixed(2);
    },

    ratio: function (from: Arg, to: Arg): number {
      if (!from || !to || typeof from === 'string' || typeof to === 'string') {
        return 0;
      }
      return +((from / to) * 100).toFixed(2);
    },

    growthRatio: function (dayFrom: Arg, perFrom: Arg, dayTo: Arg, perTo: Arg): number {
      if (
        !dayFrom ||
        !perFrom ||
        !dayTo ||
        !perTo ||
        typeof dayTo === 'string' ||
        typeof perFrom === 'string' ||
        typeof dayFrom === 'string' ||
        typeof perTo === 'string'
      ) {
        return 0;
      }
      return +(this.ratio(perFrom, perTo) - this.ratio(perFrom - dayFrom, perTo - dayTo)).toFixed(
        2,
      );
    },

    dayPlane: function (sales: Arg, plane: Arg): number {
      if (!sales || !plane || typeof plane === 'string' || typeof sales === 'string') {
        return 0;
      }
      return +((plane - sales) / (dayCount - day)).toFixed(0);
    },
  };
};
