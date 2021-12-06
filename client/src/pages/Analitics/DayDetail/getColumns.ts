import { Planes } from '../../../lib/slices/planes/planes.type';

type Column = {
  label: string;
  fn: (sale: (string | number)[]) => string | number;
};

export function getColumns(planes: Planes): Column[] {
  return [
    {
      label: 'ФИО',
      fn: (sale: (string | number)[]) => sale[0],
    },
    {
      label: 'ТО',
      fn: (sale: (string | number)[]) => sale[14],
    },
    {
      label: 'Устройства',
      fn: (sale: (string | number)[]) => sale[1],
    },
    {
      label: 'Сумма',
      fn: (sale: (string | number)[]) => sale[8],
    },
    {
      label: 'Доля',
      fn: (sale: (string | number)[]) => {
        if (+sale[1] === 0) {
          return 100;
        } else {
          return ((+sale[8] / +sale[1]) * 100).toFixed(2);
        }
      },
    },
    {
      label: 'Отставание',
      fn: (sale: (string | number)[]) =>
        (+sale[8] - (parseFloat(planes.to_cm + '') / 100) * +sale[1]).toFixed(0),
    },
    {
      label: 'Сумма',
      fn: (sale: (string | number)[]) => sale[10],
    },
    {
      label: 'Доля',
      fn: (sale: (string | number)[]) => {
        if (+sale[1] === 0) {
          return 100;
        } else {
          return ((+sale[10] / +sale[1]) * 100).toFixed(2);
        }
      },
    },
    {
      label: 'Отставание',
      fn: (sale: (string | number)[]) => {
        return (+sale[10] - (parseFloat(planes.to_cz + '') / 100) * +sale[1]).toFixed(0);
      },
    },

    {
      label: 'ЦМ + ЦЗ',
      fn: (sale: (string | number)[]) => +sale[8] + +sale[10],
    },
    {
      label: 'ЦА',
      fn: (sale: (string | number)[]) => sale[12],
    },
    {
      label: 'Тотал',
      fn: (sale: (string | number)[]) => +sale[12] + +sale[10] + +sale[8],
    },
  ];
}
