import styled from 'styled-components';
import { Sales, SalesIndexes } from '@lib/slices/sales';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from 'recharts';
import { Checkbox } from '@components/Checkbox';
import { useState } from 'react';

type Props = {
  sales: Sales[];
};

type Checker = {
  label: string;
  color: string;
  checked: boolean;
  value: (sales: Sales) => number | string;
};

export const options: Checker[] = [
  {
    label: 'День',
    value: (sale: Sales) => sale.day.split('.')[0] + '.' + sale.day.split('.')[1],
    color: 'green',
    checked: false,
  },
  {
    label: 'ТО',
    value: (sale: Sales) => sale.ttSales[SalesIndexes.TO],
    color: 'black',
    checked: false,
  },
  {
    label: 'Устройства',
    value: (sale: Sales) => sale.ttSales[SalesIndexes.DEVICES],
    color: 'gray',
    checked: false,
  },
  {
    label: 'ЦМ',
    value: (sale: Sales) => sale.ttSales[SalesIndexes.CM],
    color: 'green',
    checked: true,
  },
  {
    label: 'ЦЗ',
    value: (sale: Sales) => sale.ttSales[SalesIndexes.CZ],
    color: 'red',
    checked: true,
  },
  {
    label: 'ЦА',
    value: (sale: Sales) => sale.ttSales[SalesIndexes.CA],
    color: 'violet',
    checked: true,
  },
  {
    label: 'Сервисы',
    value: (sale: Sales) =>
      sale.ttSales[SalesIndexes.CM] + sale.ttSales[SalesIndexes.CZ] + sale.ttSales[SalesIndexes.CA],
    color: 'orange',
    checked: true,
  },
  {
    label: 'Доля ЦМ',
    value: (sale: Sales) =>
      ((sale.ttSales[SalesIndexes.CM] / sale.ttSales[SalesIndexes.DEVICES]) * 100).toFixed(2),
    color: 'green',
    checked: false,
  },
  {
    label: 'Доля ЦЗ',
    value: (sale: Sales) =>
      ((sale.ttSales[SalesIndexes.CZ] / sale.ttSales[SalesIndexes.DEVICES]) * 100).toFixed(2),
    color: 'red',
    checked: false,
  },
  {
    label: 'Доля Сервисы',
    value: (sale: Sales) =>
      (
        ((sale.ttSales[SalesIndexes.CM] + sale.ttSales[SalesIndexes.CM]) /
          sale.ttSales[SalesIndexes.DEVICES]) *
        100
      ).toFixed(2),
    color: 'orange',
    checked: false,
  },
];

const Wrapper = styled.div``;

const Checkboxes = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PeriodChart = (props: Props): JSX.Element => {
  const [checkers, setCheckers] = useState(options);

  const handleChange = (label: string) => {
    const tmp = checkers.map((checker) => {
      if (checker.label !== label) {
        return checker;
      } else {
        return { ...checker, checked: !checker.checked };
      }
    });
    setCheckers(tmp);
  };

  const lines = checkers.map((option) => {
    if (option.checked) {
      return (
        <Line key={option.label} type="monotone" dataKey={option.label} stroke={option.color} />
      );
    }
  });

  const checkboxes = checkers.map((checker) => {
    if (checker.label !== 'День') {
      return (
        <Checkbox
          key={checker.label}
          value={checker.checked}
          label={checker.label}
          handleChange={() => handleChange(checker.label)}
        />
      );
    }
  });

  const data = props.sales.map((sale) => {
    const tmp = {};
    checkers.forEach((checker) => {
      Object.assign(tmp, { [checker.label]: checker.value(sale) });
    });
    return tmp;
  });

  return (
    <Wrapper>
      <Checkboxes>{checkboxes}</Checkboxes>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={730}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="День" />
          <YAxis />
          <Tooltip />
          <Legend />
          {lines}
        </LineChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};
