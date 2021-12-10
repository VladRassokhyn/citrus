import React from 'react';
import styled from 'styled-components';
import { getDaysFormated } from '../../../lib/common';
import { useTypedSelector } from '../../../lib/hooks';
import { salesSelectors } from '../../../lib/slices/sales';

type StyleProps = {
  day: string;
};

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

const Title = styled.h1<StyleProps>`
  padding: 5px;
  background-color: white;
  height: 20px;
  font-size: 12pt;
  text-align: center;
  color: ${(props) =>
    props.day === 'Saturday' || props.day === 'Sunday' ? '#b3405b' : 'var (--color-stroke)'};
`;

export const WeekTitle = (): JSX.Element => {
  const { month, year } = useTypedSelector(salesSelectors.monthAndYear);
  const { weekDays } = getDaysFormated(month, year);

  return (
    <WeekTitleWrapper>
      {weekDays.map((day) => (
        <Title key={day.value} day={day.value}>
          {day.label}
        </Title>
      ))}
    </WeekTitleWrapper>
  );
};
