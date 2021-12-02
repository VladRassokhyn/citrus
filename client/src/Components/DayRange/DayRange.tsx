import { useState } from 'react';
import styled from 'styled-components';
import { getDaysFormated } from '../../lib/common';
import { WeekTitle } from '../../pages/Analitics/Calendar/WeekTitle';

type Props = {
  from: number;
  to: number;
  changeFrom: (from: number) => void;
  changeTo: (to: number) => void;
};

type StyleProps = {
  chosen: boolean;
};

const Wrapper = styled.div``;

const EmptyDay = styled.div``;

const Day = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  padding: 5px;
  background-color: ${(props) => (props.chosen ? 'var(--color-button)' : '#f1f1f1')};
  transition: linear 0.1s;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const H1 = styled.div<StyleProps>`
  font-size: 12pt;
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

const H2 = styled.h1`
  color: white;
  font-size: 14pt;
`;

const Days = styled.div`
  padding: 0 15px 15px 15px;
  display: grid;
  grid-template-columns: repeat(7, 30px);
  gap: 2px;
`;

export const DayRange = (props: Props): JSX.Element => {
  const { from, to, changeFrom, changeTo } = props;
  const [isFromChanged, setIsFromChanged] = useState(false);
  const days = getDaysFormated(new Date().getMonth(), new Date().getFullYear());

  const handleChange = (day: number) => {
    if (!isFromChanged) {
      setIsFromChanged(true);
      changeFrom(day);
      changeTo(day);
    } else {
      changeTo(day);
      setIsFromChanged(false);
    }
  };

  return (
    <Wrapper>
      <RangeWrapper>
        <RangeTitle>
          <H2>Диапазон дат</H2>
        </RangeTitle>
        <WeekTitle />
        <Days>
          {days.days.map((day, i) => {
            if (!day) {
              return <EmptyDay key={i} />;
            }
            const dayNumber = day?.split(' ')[1].split('.')[0];
            const thisDay = dayNumber ? parseInt(dayNumber) : 0;
            const chosen = thisDay <= to && thisDay >= from;
            return (
              <Day key={i} chosen={chosen} onClick={() => handleChange(thisDay)}>
                <H1 chosen={chosen}>{dayNumber ? dayNumber : ' '}</H1>
              </Day>
            );
          })}
        </Days>
      </RangeWrapper>
    </Wrapper>
  );
};
