import React from 'react';
import styled from 'styled-components';
import { CalendarDay } from './CalendarDay';
import { Planes } from '../../../lib/slices/planes/planes.type';
import { Sales } from '../../../lib/slices/sales/sales.type';
import { getCalcFns } from '../../../lib/common';
import { User } from '../../../lib/slices/users';
import { WeekTitle } from './WeekTitle';
import { useTypedSelector } from '../../../lib/hooks';
import { salesSelectors } from '../../../lib/slices/sales';
import { Shop } from '../../../lib/slices/shop';

type Props = {
  sales: Sales[];
  authUser: User;
  planes: Planes;
  days: (string | null)[];
  currentShop: Shop;
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
  @media (max-width: 560px) {
    grid-template-rows: repeat(5, 60px);
  }
`;

const WeekToWeek = styled.div`
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

export const Calendar = (props: Props): JSX.Element => {
  const { sales, planes, days } = props;
  const calcFns = getCalcFns();
  const weekSales: Sales[] = [];
  const { month } = useTypedSelector(salesSelectors.monthAndYear);

  const calendarDays = days.map((day, i) => {
    const isWeekend = day?.split(' ')[0] === 'Saturday' || day?.split(' ')[0] === 'Sunday';
    const daySales = sales.find((salesItem) => salesItem.day === day?.split(' ')[1]);
    const salesByToday = sales.filter(
      (sale) => parseInt(sale.day) < (day ? parseInt(day.split(' ')[1]) : 0),
    );

    const monthSales = calcFns.monthSalesNew(salesByToday);

    if (i % 7 === 0 && i !== 0) {
      weekSales.push({ ...monthSales, day: String(i) });
    }

    return (
      <CalendarDay
        isEmpty={!day}
        ttSales={daySales?.ttSales}
        isWeekend={isWeekend}
        delay={i}
        monthSales={monthSales}
        tt={props.currentShop}
        planes={planes}
        title={day ? day.split(' ')[1] : ''}
        key={i}
        sales={daySales}
      />
    );
  });

  return (
    <Wrapper>
      <CalendarContent>
        <WeekTitle />
        <CalendarContainer>{calendarDays}</CalendarContainer>
      </CalendarContent>
      <WeekToWeek>
        {weekSales.map((week, i) => {
          const weeFns = getCalcFns(week.day, month);
          const currentCm = weeFns.forecastPercent(week.ttSales[8], planes.cm);
          const prevCm = weeFns.forecastPercent(
            weekSales[i - 1]?.ttSales[8],
            planes.cm,
            +week.day - 7,
          );
          const currentCz = weeFns.forecastPercent(week.ttSales[10], planes.cz);
          const prevCz = weeFns.forecastPercent(
            weekSales[i - 1]?.ttSales[10],
            planes.cz,
            +week.day - 7,
          );
          const currentCa = weeFns.forecastPercent(week.ttSales[12], planes.ca);
          const prevCa = weeFns.forecastPercent(
            weekSales[i - 1]?.ttSales[12],
            planes.ca,
            +week.day - 7,
          );

          return (
            <WeekToWeekItem key={i}>
              <WeekToWeekArrow />
              <WeekToWeekValues>
                <H1 color={'green'}>
                  {currentCm - prevCm > 0 && '+'}
                  {(currentCm - prevCm).toFixed(2)}
                </H1>
                <H1 color={'red'}>
                  {currentCz - prevCz > 0 && '+'}
                  {(currentCz - prevCz).toFixed(2)}
                </H1>
                <H1 color={'#9018ad'}>
                  {currentCa - prevCa > 0 && '+'}
                  {(currentCa - prevCa).toFixed(2)}
                </H1>
              </WeekToWeekValues>
            </WeekToWeekItem>
          );
        })}
      </WeekToWeek>
    </Wrapper>
  );
};
