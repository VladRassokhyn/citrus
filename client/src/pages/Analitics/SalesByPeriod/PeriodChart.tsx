import styled from 'styled-components';
import { Sales, SalesIndexes } from '../../../lib/slices/sales';
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
import { Checkbox } from '../../../Components/Checkbox';

type Props = {
  sales: Sales[];
};

const Wrapper = styled.div``;

const Checkboxes = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PeriodChart = (props: Props): JSX.Element => {
  const data = props.sales.map((sale) => ({
    ['День']: sale.day.split('.')[0] + '.' + sale.day.split('.')[1],
    ['ТО']: sale.ttSales[SalesIndexes.TO],
    ['Устройства']: sale.ttSales[SalesIndexes.DEVICES],
    ['ЦМ']: sale.ttSales[SalesIndexes.CM],
    ['ЦЗ']: sale.ttSales[SalesIndexes.CZ],
    ['ЦА']: sale.ttSales[SalesIndexes.CA],
    ['Сервисы']:
      sale.ttSales[SalesIndexes.CM] + sale.ttSales[SalesIndexes.CZ] + sale.ttSales[SalesIndexes.CA],
    ['Доля_ЦМ']: sale.ttSales[SalesIndexes.CM] / sale.ttSales[SalesIndexes.TO],
    ['Доля_ЦЗ']: sale.ttSales[SalesIndexes.CZ] / sale.ttSales[SalesIndexes.TO],
    ['Доля_Сервисы']:
      (sale.ttSales[SalesIndexes.CM] +
        sale.ttSales[SalesIndexes.CZ] +
        sale.ttSales[SalesIndexes.CA]) /
      sale.ttSales[SalesIndexes.DEVICES],
  }));

  const checkers = Object.keys(data[0]).map((line) => (
    <Checkbox key={line} value={false} label={line} />
  ));

  const lines = Object.keys(data[0]).map((line) => (
    <Line type="monotone" dataKey={line} stroke="#8884d8" />
  ));

  return (
    <Wrapper>
      <Checkboxes>{checkers}</Checkboxes>
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
