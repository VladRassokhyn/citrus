import React from 'react';
import styled from 'styled-components';
import { getDaysFormated } from '../../../lib/common';
import { useTypedSelector } from '../../../lib/hooks';
import { salesSelectors } from '../../../lib/slices/sales';

type Props = {
  size?: string;
};

type StyleProps = {
  day?: string;
  size?: string;
};

const WeekTitleWrapper = styled.div<StyleProps>`
  display: grid;
  gap: 0 1px;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px #dfdfdf;
  background-color: #dfdfdf;
`;

const Title = styled.h1<StyleProps>`
  padding: ${(props) => (props.size === 'small' ? '2px' : '5px')};
  background-color: white;
  height: ${(props) => (props.size === 'small' ? '10px' : '20px')};
  font-size: ${(props) => (props.size === 'small' ? '10pt' : '12pt')};
  text-align: center;
  color: ${(props) =>
    props.day === 'Saturday' || props.day === 'Sunday' ? '#b3405b' : 'var (--color-stroke)'};
`;

export const WeekTitle = (props: Props): JSX.Element => {
  const { month, year } = useTypedSelector(salesSelectors.monthAndYear);
  const { weekDays } = getDaysFormated(month, year);

  return (
    <WeekTitleWrapper size={props.size}>
      {weekDays.map((day) => (
        <Title key={day.value} day={day.value} size={props.size}>
          {day.label}
        </Title>
      ))}
    </WeekTitleWrapper>
  );
};
