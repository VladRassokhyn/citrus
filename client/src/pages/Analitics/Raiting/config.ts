import { SalesIndexes, SalesTuple } from '@lib/slices/sales';

export const selectorOptions = [
  {
    label: 'ТО',
    value: SalesIndexes.TO,
  },
  {
    label: 'Устройства',
    value: SalesIndexes.DEVICES,
  },
  {
    label: 'ЦМ',
    value: SalesIndexes.CM,
  },
  {
    label: 'ЦЗ',
    value: SalesIndexes.CZ,
  },
  {
    label: 'ЦА',
    value: SalesIndexes.CA,
  },
  {
    label: 'Сервисы тотал',
    value: 18,
  },
  {
    label: 'Доля ЦМ',
    value: 9,
  },
  {
    label: 'Доля ЦЗ',
    value: 11,
  },
];

function getCalc(index: number) {
  switch (index) {
    case 9:
      return (sale: SalesTuple) =>
        ((sale[SalesIndexes.CM] / sale[SalesIndexes.DEVICES]) * 100).toFixed(2);
    case 11:
      return (sale: SalesTuple) =>
        ((sale[SalesIndexes.CZ] / sale[SalesIndexes.DEVICES]) * 100).toFixed(2);
    case 18:
      return (sale: SalesTuple) =>
        sale[SalesIndexes.CM] + sale[SalesIndexes.CZ] + sale[SalesIndexes.CA];
    default:
      return (sale: SalesTuple) => sale[index];
  }
}

export const getRaitingItems = (sales: SalesTuple[] | null, index: number) => {
  if (!sales) {
    return [];
  }
  return sales.map((sale) => ({
    name: `${sale[0].split(' ')[0]} ${sale[0].split(' ')[1]}`,
    value: getCalc(index)(sale),
  }));
};
