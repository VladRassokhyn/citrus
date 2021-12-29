import { Planes } from '@lib/slices/planes';
import { Sales, SalesIndexes } from '@lib/slices/sales';

enum FillColors {
  RED = 'rgb(255, 0, 0, .3)',
  YELLOW = 'rgb(255, 255, 0, .5)',
  GREEN = 'rgb(0, 255, 0, .3)',
}

function getColor(value: number) {
  return value > 90 || value < 0
    ? FillColors.GREEN
    : value > 70
    ? FillColors.YELLOW
    : FillColors.RED;
}

export const rowsConfig = [
  {
    isHeader: true,
    value: 'Месяц',
  },
  {
    label: 'День',
    growth: null,
    value: 'day',
    withFill: false,
    isDayCell: false,
    color: getColor,
  },
  {
    label: 'Доля ЦМ',
    growth: 'cmGrowthRatio',
    value: 'cmRatio',
    withFill: false,
    isDayCell: true,
    color: getColor,
  },
  {
    label: 'Прогноз ЦМ',
    growth: 'cmGrowthForecast',
    value: 'cmForecast',
    withFill: true,
    isDayCell: true,
    color: getColor,
  },
  {
    label: 'Доля ЦЗ',
    growth: 'czGrowthRatio',
    value: 'czRatio',
    withFill: false,
    isDayCell: true,
    color: getColor,
  },
  {
    label: 'Прогноз ЦЗ',
    growth: 'czGrowthForecast',
    value: 'czForecast',
    isDayCell: true,
    withFill: true,
    color: getColor,
  },
  {
    isHeader: true,
    value: 'ДЕНЬ',
  },
  {
    label: 'Сумма Устройств',
    value: 'devices',
    withPercent: false,
    withFill: false,
    isDayCell: false,
    color: getColor,
  },
  {
    label: 'Сумма ЦМ',
    growth: null,
    value: 'cm',
    withPercent: false,
    withFill: false,
    isDayCell: false,
    color: getColor,
  },
  {
    label: 'Доля ЦМ',
    growth: null,
    value: 'cmDayRatio',
    withPercent: true,
    withFill: false,
    isDayCell: false,
    color: getColor,
  },
  {
    label: 'Выполнение ЦМ',
    growth: null,
    value: 'cmDayRate',
    withPercent: true,
    withFill: true,
    isDayCell: false,
    color: getColor,
  },
  {
    label: 'Сумма ЦЗ',
    growth: null,
    value: 'cz',
    withPercent: false,
    withFill: false,
    isDayCell: false,
    color: getColor,
  },
  {
    label: 'Доля ЦЗ',
    growth: null,
    value: 'czDayRatio',
    withPercent: true,
    withFill: false,
    isDayCell: false,
    color: getColor,
  },
  {
    label: 'Выполнение ЦЗ',
    growth: null,
    value: 'czDayRate',
    withPercent: true,
    withFill: true,
    isDayCell: false,
    color: getColor,
  },
  {
    label: 'Сумма ЦА',
    growth: null,
    value: 'ca',
    withPercent: false,
    withFill: false,
    isDayCell: false,
    color: getColor,
  },
];

export function getCalcs(
  daySales: Sales,
  monthSales: Sales,
  calcFns: any,
  planes: Planes,
  day: number,
) {
  return {
    cmDayRatio: calcFns.ratio(
      daySales.ttSales[SalesIndexes.CM],
      daySales.ttSales[SalesIndexes.DEVICES],
    ),
    czDayRatio: calcFns.ratio(
      daySales.ttSales[SalesIndexes.CZ],
      daySales.ttSales[SalesIndexes.DEVICES],
    ),
    cmRatio: calcFns.ratio(
      monthSales.ttSales[SalesIndexes.CM],
      monthSales.ttSales[SalesIndexes.DEVICES],
    ),
    czRatio: calcFns.ratio(
      monthSales.ttSales[SalesIndexes.CZ],
      monthSales.ttSales[SalesIndexes.DEVICES],
    ),
    cmForecast: calcFns.forecastPercent(monthSales.ttSales[SalesIndexes.CM], planes.cm),
    czForecast: calcFns.forecastPercent(monthSales.ttSales[SalesIndexes.CZ], planes.cz),
    cmGrowthForecast: calcFns.growthForecast(
      planes.cm,
      daySales.ttSales[SalesIndexes.CM],
      monthSales.ttSales[SalesIndexes.CM],
    ),
    czGrowthForecast: calcFns.growthForecast(
      planes.cz,
      daySales.ttSales[SalesIndexes.CZ],
      monthSales.ttSales[SalesIndexes.CZ],
    ),
    cmDayRate: calcFns.ratio(
      daySales.ttSales[SalesIndexes.CM],
      calcFns.dayPlane(monthSales.ttSales[SalesIndexes.CM], planes.cm),
    ),
    czDayRate: calcFns.ratio(
      daySales.ttSales[SalesIndexes.CZ],
      calcFns.dayPlane(monthSales.ttSales[SalesIndexes.CZ], planes.cz),
    ),
    cmGrowthRatio: calcFns.growthRatio(
      daySales.ttSales[SalesIndexes.CM],
      daySales.ttSales[SalesIndexes.DEVICES],
      monthSales.ttSales[SalesIndexes.CM],
      monthSales.ttSales[SalesIndexes.DEVICES],
    ),
    czGrowthRatio: calcFns.growthRatio(
      daySales.ttSales[SalesIndexes.CZ],
      daySales.ttSales[SalesIndexes.DEVICES],
      monthSales.ttSales[SalesIndexes.CZ],
      monthSales.ttSales[SalesIndexes.DEVICES],
    ),
    devices: daySales.ttSales[SalesIndexes.DEVICES],
    cm: daySales.ttSales[SalesIndexes.CM],
    cz: daySales.ttSales[SalesIndexes.CZ],
    ca: daySales.ttSales[SalesIndexes.CA],
    day,
  };
}
