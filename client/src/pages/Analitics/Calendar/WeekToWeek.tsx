import React from 'react';
import styled from 'styled-components';
import { getCalcFns } from '@lib/common';
import { ServicesColors } from '@lib/globalTypes';
import { Planes } from '@lib/slices/planes';
import { Sales, SalesIndexes } from '@lib/slices/sales';

type Props = {
  weekSales: Sales[];
  month: number;
  planes: Planes;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px 7px;
  margin-top: 40px;
  align-items: center;
  @media (max-width: 560px) {
    display: none;
  }
`;

const WeekToWeekItem = styled.div`
  height: 150px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const WeekToWeekArrow = styled.div`
  width: 15px;
  height: 144px;
  border-radius: 0 25px 25px 0;
  border-top: 1px solid green;
  border-bottom: 1px solid green;
  border-right: 2px solid green;
`;

const WeekToWeekValues = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const H1 = styled.h1<{ color: string }>`
  font-size: 8pt;
  color: ${(props) => props.color};
`;

export const WeekToWeek = (props: Props): JSX.Element => {
  const { weekSales, month, planes } = props;

  const items = weekSales.map((week, i) => {
    const weekFns = getCalcFns(week.day, month);
    const diffs = getDiffs(weekFns, week, weekSales[i - 1], planes);
    return (
      <WeekToWeekItem key={i}>
        <WeekToWeekArrow />
        <WeekToWeekValues>
          <H1 color={ServicesColors.CM}>
            {diffs.cm.prefix}
            {diffs.cm.value.toFixed(2)}
          </H1>
          <H1 color={ServicesColors.CZ}>
            {diffs.cz.prefix}
            {diffs.cz.value.toFixed(2)}
          </H1>
          <H1 color={ServicesColors.CA}>
            {diffs.ca.prefix}
            {diffs.ca.value.toFixed(2)}
          </H1>
        </WeekToWeekValues>
      </WeekToWeekItem>
    );
  });

  return <Wrapper>{items}</Wrapper>;
};

function getDiffs(weekFns: any, sales: Sales, prevSales: Sales, planes: Planes) {
  const currentCm = weekFns.forecastPercent(sales.ttSales[SalesIndexes.CM], planes.cm);
  const prevCm = weekFns.forecastPercent(
    prevSales?.ttSales[SalesIndexes.CM],
    planes.cm,
    +sales.day - 7,
  );
  const currentCz = weekFns.forecastPercent(sales.ttSales[SalesIndexes.CZ], planes.cz);
  const prevCz = weekFns.forecastPercent(
    prevSales?.ttSales[SalesIndexes.CZ],
    planes.cz,
    +sales.day - 7,
  );
  const currentCa = weekFns.forecastPercent(sales.ttSales[SalesIndexes.CA], planes.ca);
  const prevCa = weekFns.forecastPercent(
    prevSales?.ttSales[SalesIndexes.CA],
    planes.ca,
    +sales.day - 7,
  );
  return {
    cm: { prefix: currentCm - prevCm > 0 ? '+' : '', value: currentCm - prevCm },
    cz: { prefix: currentCz - prevCz > 0 ? '+' : '', value: currentCz - prevCz },
    ca: { prefix: currentCa - prevCa > 0 ? '+' : '', value: currentCa - prevCa },
  };
}
