import { ServicesColors } from '../../../lib/globalTypes';

export enum ActiveOptions {
  CM = 'CM',
  CZ = 'CZ',
  CA = 'CA',
  ALL = 'ALL',
}

export enum DefoultColors {
  CM = '#b8f2c5',
  CZ = '#f2b8b8',
  CA = '#f2b8e9',
  ALL = '#b8e1f2',
}

export const Btns = [
  {
    label: 'ВСЕ',
    value: ActiveOptions.ALL,
    defoultColor: DefoultColors.ALL,
    activeColor: ServicesColors.ALL,
  },
  {
    label: 'ЦМ',
    value: ActiveOptions.CM,
    defoultColor: DefoultColors.CM,
    activeColor: ServicesColors.CM,
  },
  {
    label: 'ЦЗ',
    value: ActiveOptions.CZ,
    defoultColor: DefoultColors.CZ,
    activeColor: ServicesColors.CZ,
  },
  {
    label: 'ЦА',
    value: ActiveOptions.CA,
    defoultColor: DefoultColors.CA,
    activeColor: ServicesColors.CA,
  },
];
