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
import { WeekToWeek } from './WeekToWeek';

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

export const Calendar = (props: Props): JSX.Element => {
  const { sales, planes, days } = props;
  const calcFns = getCalcFns();
  const weekSales: Sales[] = [];
  const { month } = useTypedSelector(salesSelectors.monthAndYear);

  const calendarDays = days.map((day, i) => {
    const isWeekend = day?.split(' ')[0] === 'Saturday' || day?.split(' ')[0] === 'Sunday';
    const daySales = sales.find((salesItem) => salesItem.day === day?.split(' ')[1]);
    const salesFromStartToToday = sales.filter((sale) => sale.day < (day?.split(' ')[1] || 0));
    const monthSales = calcFns.monthSalesNew(salesFromStartToToday);
    if (i % 7 === 0 && i !== 0) weekSales.push({ ...monthSales, day: String(i) });

    return (
      <CalendarDay
        isEmpty={!day}
        isWeekend={isWeekend}
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
      <WeekToWeek weekSales={weekSales} month={month} planes={planes} />
    </Wrapper>
  );
};
