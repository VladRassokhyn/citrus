import React, { useState } from 'react';
import styled from 'styled-components';
import { getDaysFormated } from '@lib/common';
import { WeekTitle } from '@pages/Analitics/Calendar/WeekTitle';
import { useTypedSelector } from '@lib/hooks';
import { salesSelectors } from '@lib/slices/sales';

type Props = {
  from: number;
  to: number;
  activeDays?: number;
  size?: string;
  changeFrom: (from: number) => void;
  changeTo: (to: number) => void;
};

type StyleProps = {
  chosen?: boolean;
  size?: string;
};

const Wrapper = styled.div``;

const EmptyDay = styled.div``;

const Day = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => (props.size === 'small' ? '15px' : '20px')};
  padding: ${(props) => (props.size === 'small' ? '2px' : '5px')};
  background-color: ${(props) => (props.chosen ? 'var(--color-button)' : '#f1f1f1')};
  transition: linear 0.1s;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const H1 = styled.div<StyleProps>`
  font-size: ${(props) => (props.size === 'small' ? '10pt' : '12pt')};
  color: ${(props) => (props.chosen ? 'white' : 'black')};
`;

const RangeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  border-radius: 10px;
  box-shadow: 0 0 5px #dfdfdf;
`;

const RangeTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 10px 10px 0 0;
  background-color: var(--color-button);
`;

const H2 = styled.h1<StyleProps>`
  color: white;
  font-size: ${(props) => (props.size === 'small' ? '10pt' : '14pt')};
`;

const Days = styled.div<StyleProps>`
  padding: ${(props) => (props.size === 'small' ? ' 0 5px 5px 5px' : '0 15px 15px 15px')};
  display: grid;
  grid-template-columns: repeat(7, ${(props) => (props.size === 'small' ? '20px' : '30px')});
  gap: 2px;
`;

export const DayRange = (props: Props): JSX.Element => {
  const { month, year } = useTypedSelector(salesSelectors.monthAndYear);
  const { from, to, changeFrom, changeTo, activeDays, size } = props;
  const [isFromChanged, setIsFromChanged] = useState(false);
  const days = getDaysFormated(month, year);

  const handleChange = (day: number) => {
    if (!isFromChanged) {
      setIsFromChanged(true);
      changeFrom(day);
      changeTo(day);
    } else {
      if (day < from) {
        changeFrom(day);
        changeTo(day);
      } else {
        changeTo(day);
        setIsFromChanged(false);
      }
    }
  };

  return (
    <Wrapper>
      <RangeWrapper>
        <RangeTitle>
          <H2 size={size}>Диапазон дат</H2>
        </RangeTitle>
        <WeekTitle size={size} />
        <Days size={size}>
          {days.days.map((day, i) => {
            if (!day) {
              return <EmptyDay key={i} />;
            }
            const dayNumber = day?.split(' ')[1].split('.')[0];
            const thisDay = dayNumber ? parseInt(dayNumber) : 0;
            const chosen = thisDay <= to && thisDay >= from;
            if (activeDays && thisDay > activeDays) {
              return <Day size={size} key={i} chosen={false} />;
            }
            return (
              <Day size={size} key={i} chosen={chosen} onClick={() => handleChange(thisDay)}>
                <H1 size={size} chosen={chosen}>
                  {dayNumber ? dayNumber : ' '}
                </H1>
              </Day>
            );
          })}
        </Days>
      </RangeWrapper>
    </Wrapper>
  );
};
