import React, { useState } from 'react';
import styled from 'styled-components';
import { Sales, SalesIndexes } from '../../../lib/slices/sales';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';

type Props = {
  days: string[];
  sales: Sales[];
};

type StyleProps = {
  daysCount?: number;
  barHeight?: number;
  color?: string;
  isHolyday?: boolean;
  salfe?: boolean;
  activeColor?: string;
  active?: boolean;
};

const Wrapper = styled.div`
  min-height: 130px;
  border-radius: 5px;
  box-shadow: 0 0 5px #dfdfdf;
  margin-bottom: 15px;
  padding: 15px 3%;
  display: grid;
  grid-template-columns: 1fr 100px;

  @media (max-width: 559px) {
    display: none;
  }
`;
const Buttons = styled.div`
  display: flex;
  height: 100%;
  padding: 0 0 0 10px;
  border-left: 1px solid #dfdfdf;
  flex-direction: column;
  gap: 5px;
`;

const Chart = styled.div``;

const Btn = styled.button<StyleProps>`
  color: ${(props) => (props.active ? 'white' : 'var(--color-stroke)')};
  width: 100%;
  border: 0;
  padding: 5px;
  border-radius: 5px;
  background-color: ${(props) => (props.active ? props.activeColor : props.color)};
  transition: linear 0.3s;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.activeColor};
    color: white;
  }
`;

export const DayByDay = (props: Props): JSX.Element => {
  const { days, sales } = props;
  const [activeBar, setActiveBar] = useState('ALL');

  if (props.sales.length < 1) {
    return <div></div>;
  }

  const data = days.map((day, i) => {
    return {
      name: i + 1,
      ['ЦМ']: sales[i]?.ttSales[SalesIndexes.CM] || 0,
      ['ЦЗ']: sales[i]?.ttSales[SalesIndexes.CZ] || 0,
      ['ЦА']: sales[i]?.ttSales[SalesIndexes.CA] || 0,
    };
  });

  return (
    <Wrapper>
      <Chart>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {activeBar === 'ALL' && (
              <>
                <Bar barSize={10} dataKey="ЦМ" fill="green" />
                <Bar barSize={10} dataKey="ЦЗ" fill="red" />
                <Bar barSize={10} dataKey="ЦА" fill="#9018ad" />
              </>
            )}
            {activeBar === 'CM' && <Bar barSize={30} dataKey="ЦМ" fill="green" />}
            {activeBar === 'CZ' && <Bar barSize={30} dataKey="ЦЗ" fill="red" />}
            {activeBar === 'CA' && <Bar barSize={30} dataKey="ЦА" fill="#9018ad" />}
          </BarChart>
        </ResponsiveContainer>
      </Chart>

      <Buttons>
        <Btn
          color={'#b8e1f2'}
          activeColor={'#413eed'}
          active={activeBar === 'ALL'}
          onClick={() => setActiveBar('ALL')}
        >
          Все
        </Btn>
        <Btn
          color={'#b8f2c5'}
          activeColor={'#347f2d'}
          active={activeBar === 'CM'}
          onClick={() => setActiveBar('CM')}
        >
          ЦМ
        </Btn>
        <Btn
          color={'#f2b8b8'}
          activeColor={'#ab3744'}
          active={activeBar === 'CZ'}
          onClick={() => setActiveBar('CZ')}
        >
          ЦЗ
        </Btn>
        <Btn
          color={'#f2b8e9'}
          activeColor={'#a937ab'}
          active={activeBar === 'CA'}
          onClick={() => setActiveBar('CA')}
        >
          ЦА
        </Btn>
      </Buttons>
    </Wrapper>
  );
};
