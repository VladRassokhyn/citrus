import React from 'react';
import styled from 'styled-components';
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from 'recharts';

type Props = {
  values: { label: string; value: number }[];
};

const Wrapper = styled.div`
  min-width: 600px;
`;

export const DiffDiagram = (props: Props): JSX.Element => {
  const { values } = props;

  return (
    <Wrapper>
      <ResponsiveContainer width="100%" height={150}>
        <LineChart
          width={500}
          height={150}
          data={values}
          margin={{
            top: 30,
            right: 30,
            left: 30,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <Tooltip />

          <Line connectNulls type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8">
            <LabelList dataKey="value" position="top" />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};
