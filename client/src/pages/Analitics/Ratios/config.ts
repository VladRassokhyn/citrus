import { SalesIndexes, SalesTuple } from '@lib/slices/sales';

type Option = {
  label: string;
  value: number;
};

export const options: Option[] = [
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
];

export function getColumns(from: Option, to: Option) {
  return [
    {
      label: 'Имя',
      value: (sale: SalesTuple) => sale[SalesIndexes.NAME]?.split(' ')[0],
    },
    {
      label: from.label,
      value: (sale: SalesTuple) => sale[from.value],
    },
    {
      label: to.label,
      value: (sale: SalesTuple) => sale[to.value],
    },
    {
      label: `${to.label} / ${from.label}`,
      value: (sale: SalesTuple) => ((+sale[to.value] / +sale[from.value]) * 100).toFixed(2),
    },
  ];
}
