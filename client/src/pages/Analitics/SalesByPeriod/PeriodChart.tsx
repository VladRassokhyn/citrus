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
    ['Доля ЦМ']: sale.ttSales[SalesIndexes.CM] / sale.ttSales[SalesIndexes.TO],
    ['Доля ЦЗ']: sale.ttSales[SalesIndexes.CZ] / sale.ttSales[SalesIndexes.TO],
    ['Доля Сервисы']:
      (sale.ttSales[SalesIndexes.CM] +
        sale.ttSales[SalesIndexes.CZ] +
        sale.ttSales[SalesIndexes.CA]) /
      sale.ttSales[SalesIndexes.DEVICES],
  }));

  const lines = Object.keys(data[0]).map((line) => (
    <Checkbox key={line} value={false} label={line} />
  ));

  return (
    <Wrapper>
      <Checkboxes>{lines}</Checkboxes>
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
          <Line type="monotone" dataKey="ЦМ" stroke="#8884d8" />
          <Line type="monotone" dataKey="ЦЗ" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};
