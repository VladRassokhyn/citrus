import React from 'react';
import styled from 'styled-components';
import {
  Legend,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  ResponsiveContainer,
  YAxis,
} from 'recharts';

type Props = {
  values: {
    label: string;
    ['Первый период']: number;
    ['Второй период']: number;
  }[];
};

const Wrapper = styled.div`
  min-width: 600px;
`;

export const DiffDiagram = (props: Props): JSX.Element => {
  const { values } = props;

  return (
    <Wrapper>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart height={200} data={values} margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
          <Legend height={36} align={'right'} verticalAlign={'top'} />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8ede91" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8ede91" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#de8e8e" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#de8e8e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Первый период"
            stroke="#8ede91"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="Второй период"
            stroke="#de8e8e"
            fillOpacity={1}
            fill="url(#colorPv)"
          />

          <YAxis />
          <XAxis dataKey="label" />
        </AreaChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};
