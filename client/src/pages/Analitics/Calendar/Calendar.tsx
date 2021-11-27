import styled from 'styled-components';
import { format } from 'date-fns';
import { CalendarDay } from './CalendarDay';
import { DaySales } from '../../../lib/slices/daySales';
import { User } from '../../../lib/globalTypes';
import { Circle } from '../Circle/Circle';
import { Planes } from '../../../lib/slices/planes/planes.type';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DayByDay } from '../DayByDay';
import { Sales } from '../../../lib/slices/sales/sales.type';
import { calcFns } from '../../../lib/common';
import { DetailTable } from '../DayDetail/DetailTable';
import { getColumns } from '../DayDetail';

type Props = {
  sales: DaySales[];
  newSales: Sales[];
  authUser: User;
  planes: Planes;
  days: (string | null)[];
  weekDays: { label: string; value: string }[];
};

type StyleProps = {
  day?: string;
};

const Wrapper = styled.div`
  display: flex;
  flex-dirrection: row;
  gap: 5px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 5px #dfdfdf;
`;

const CalendarContent = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
`;

const CalendarContainer = styled.div`
  display: grid;
  gap: 15px 7px;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 150px);
  @media (max-width: 560px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
`;

const WeekToWeek = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px 7px;
  margin-top: 115px;
  align-items: center;
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

const WeekTitleWrapper = styled.div`
  display: grid;
  gap: 0 1px;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px #dfdfdf;
  background-color: #dfdfdf;
  @media (max-width: 559px) {
    display: none;
  }
`;

const WeekTitle = styled.h1<StyleProps>`
  padding: 5px;
  background-color: white;
  height: 20px;
  font-size: 12pt;
  text-align: center;
  color: ${(props) =>
    props.day === 'Saturday' || props.day === 'Sunday' ? '#b3405b' : 'var (--color-stroke)'};
`;

const H1 = styled.h1<{ color: string }>`
  font-size: 8pt;
  color: ${(props) => props.color};
`;

export const Calendar = (props: Props): JSX.Element => {
  const { newSales, sales, authUser, planes, days, weekDays } = props;

  const weekSales: DaySales[] = [];

  const calendarDays = days.map((day, i) => {
    if (!day) {
      return <CalendarDay ttSales={[]} tt={authUser.tt} delay={i} key={i} title={''} />;
    } else {
      const isWeekend = day.split(' ')[0] === 'Saturday' || day.split(' ')[0] === 'Sunday';
      const daySales = sales.find((salesItem) => salesItem.day === day.split(' ')[1]);
      const newSale = newSales.find((salesItem) => salesItem.day === day.split(' ')[1]);
      const salesByToday = sales.filter((sale) => parseInt(sale.day) < parseInt(day.split(' ')[1]));
      const mounthSales = calcFns.mounthSales(salesByToday);
      if (i % 7 === 0 && i !== 0) {
        weekSales.push(mounthSales);
      }

      return (
        <CalendarDay
          ttSales={newSale?.ttSales}
          isWeekend={isWeekend}
          delay={i}
          daySales={daySales}
          mounthSales={mounthSales}
          tt={authUser.tt}
          planes={planes}
          title={day.split(' ')[1]}
          key={i}
          sales={newSale}
        />
      );
    }
  });

  console.log(weekSales);
  return (
    <Wrapper>
      <CalendarContent>
        <WeekTitleWrapper>
          {weekDays.map((day) => (
            <WeekTitle key={day.value} day={day.value}>
              {day.label}
            </WeekTitle>
          ))}
        </WeekTitleWrapper>
        <CalendarContainer>{calendarDays}</CalendarContainer>
      </CalendarContent>
      <WeekToWeek>
        {weekSales.map((week, i) => {
          const currentCm = calcFns.forecastPercent(week.cm, planes.cm);
          const prevCm = calcFns.forecastPercent(
            weekSales[i - 1] ? weekSales[i - 1].cm : 0,
            planes.cm,
          );
          const currentCz = calcFns.forecastPercent(week.cz, planes.cz);
          const prevCz = calcFns.forecastPercent(
            weekSales[i - 1] ? weekSales[i - 1].cz : 0,
            planes.cz,
          );
          const currentCa = calcFns.forecastPercent(week.ca, planes.ca);
          const prevCa = calcFns.forecastPercent(
            weekSales[i - 1] ? weekSales[i - 1].ca : 0,
            planes.ca,
          );

          return (
            <WeekToWeekItem key={i}>
              <WeekToWeekArrow />
              <WeekToWeekValues>
                <H1 color={'green'}>+{(currentCm - prevCm).toFixed(2)}</H1>
                <H1 color={'red'}>+{(currentCz - prevCz).toFixed(2)}</H1>
                <H1 color={'#9018ad'}>+{(currentCa - prevCa).toFixed(2)}</H1>
              </WeekToWeekValues>
            </WeekToWeekItem>
          );
        })}
      </WeekToWeek>
    </Wrapper>
  );
};
