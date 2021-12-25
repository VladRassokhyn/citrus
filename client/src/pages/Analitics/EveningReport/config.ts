import { Planes } from "../../../lib/slices/planes/planes.type";
import { Sales, SalesIndexes } from "../../../lib/slices/sales";

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

export const monthRowsConfig = [
  {
    label: 'Доля ЦМ',
    growth: 'cmGrowthRatio',
    value: 'cmRatio',
    withFill: false,
    color: getColor,
  },
  {
    label: 'Прогноз ЦМ',
    growth: 'cmGrowthForecast',
    value: 'cmForecast',
    withFill: true,
    color: getColor,
  },
  {
    label: 'Доля ЦЗ',
    growth: 'czGrowthRatio',
    value: 'czRatio',
    withFill: false,
    color: getColor,
  },
  {
    label: 'Прогноз ЦЗ',
    growth: 'czGrowthForecast',
    value: 'czForecast',
    withFill: true,
    color: getColor,
  },
];

export const dayRowsConfig = [
  {
    label: 'Сумма Устройств',
    value: 'devices',
    withPercent: false,
    withFill: false,
    color: getColor,
  },
  {
    label: 'Сумма ЦМ',
    value: 'cm',
    withPercent: false,
    withFill: false,
    color: getColor,
  },
  {
    label: 'Доля ЦМ',
    value: 'cmDayRatio',
    withPercent: true,
    withFill: false,
    color: getColor,
  },
  {
    label: 'Выполнение ЦМ',
    value: 'cmDayRate',
    withPercent: true,
    withFill: true,
    color: getColor,
  },
  {
    label: 'Сумма ЦЗ',
    value: 'cz',
    withPercent: false,
    withFill: false,
    color: getColor,
  },
  {
    label: 'Доля ЦЗ',
    value: 'czDayRatio',
    withPercent: true,
    withFill: false,
    color: getColor,
  },
  {
    label: 'Выполнение ЦЗ',
    value: 'czDayRate',
    withPercent: true,
    withFill: true,
    color: getColor,
  },
  {
    label: 'Сумма ЦА',
    value: 'ca',
    withPercent: false,
    withFill: false,
    color: getColor,
  },
];

export function getCalcs(daySales: Sales, monthSales: Sales, calcFns: any, planes: Planes) {
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
  };
}
