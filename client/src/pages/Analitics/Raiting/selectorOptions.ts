import { SalesIndexes } from '@lib/slices/sales';

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
];
