import React, { useState } from 'react';
import styled from 'styled-components';
import { Sales, SalesIndexes } from '../../../lib/slices/sales';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';
import { ActiveColors, ActiveOptions, DefoultColors } from './types';

type Props = {
  days: string[];
  sales: Sales[];
};

type StyleProps = {
  color: string;
  activeColor: string;
  active: boolean;
};

const Wrapper = styled.div`
  min-height: 130px;
  border-radius: 5px;
  box-shadow: 0 0 5px #dfdfdf;
  margin-bottom: 15px;
  padding: 15px 3%;
  display: grid;
  grid-template-columns: 1fr 100px;
  @media (max-width: 560px) {
    overflow-x: scroll;
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

const Chart = styled.div`
  width: 100%;
  min-width: 1000px;
`;

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
  const [activeBar, setActiveBar] = useState(ActiveOptions.ALL);

  const data = days.map((_, i) => {
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
          <BarChart width={1000} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {activeBar === ActiveOptions.ALL && (
              <>
                <Bar barSize={10} dataKey="ЦМ" fill={ActiveColors.CM} />
                <Bar barSize={10} dataKey="ЦЗ" fill={ActiveColors.CZ} />
                <Bar barSize={10} dataKey="ЦА" fill={ActiveColors.CA} />
              </>
            )}
            {activeBar === ActiveOptions.CM && (
              <Bar barSize={30} dataKey="ЦМ" fill={ActiveColors.CM} />
            )}
            {activeBar === ActiveOptions.CZ && (
              <Bar barSize={30} dataKey="ЦЗ" fill={ActiveColors.CZ} />
            )}
            {activeBar === ActiveOptions.CA && (
              <Bar barSize={30} dataKey="ЦА" fill={ActiveColors.CA} />
            )}
          </BarChart>
        </ResponsiveContainer>
      </Chart>

      <Buttons>
        <Btn
          color={DefoultColors.ALL}
          activeColor={ActiveColors.ALL}
          active={activeBar === ActiveOptions.ALL}
          onClick={() => setActiveBar(ActiveOptions.ALL)}
        >
          Все
        </Btn>
        <Btn
          color={DefoultColors.CM}
          activeColor={ActiveColors.CM}
          active={activeBar === ActiveOptions.CM}
          onClick={() => setActiveBar(ActiveOptions.CM)}
        >
          ЦМ
        </Btn>
        <Btn
          color={DefoultColors.CZ}
          activeColor={ActiveColors.CZ}
          active={activeBar === ActiveOptions.CZ}
          onClick={() => setActiveBar(ActiveOptions.CZ)}
        >
          ЦЗ
        </Btn>
        <Btn
          color={DefoultColors.CA}
          activeColor={ActiveColors.CA}
          active={activeBar === ActiveOptions.CA}
          onClick={() => setActiveBar(ActiveOptions.CA)}
        >
          ЦА
        </Btn>
      </Buttons>
    </Wrapper>
  );
};
