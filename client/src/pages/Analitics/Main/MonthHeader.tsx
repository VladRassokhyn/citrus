import React, { memo, useCallback, useEffect } from 'react';
import styled from 'styled-components';

type Props = {
  month: number;
  year: number;
  dateChange: (month: number, year: number) => void;
};

const Wrapper = styled.div`
  width: 100%;
  height: 35px;
  padding: 5px 0;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  box-shadow: 0 0 5px #dfdfdf;
  border-radius: 5px;
`;

const GoBtn = styled.button`
  font-size: 20pt;
  background-color: white;
  border: 0;
  transition: linear 0.3s;
  border-radius: 5px;
  &:hover {
    box-shadow: 0 0 5px #dfdfdf;
    cursor: pointer;
  }
`;

const Month = styled.h1`
  font-size: 14pt;
  color: var(--color-stroke);
`;

export const MonthHeader = memo(
  (props: Props): JSX.Element => {
    const { dateChange, month, year } = props;

    const handleMonthIncrement = useCallback(() => dateChange(month + 1, year), [month, year]);
    const handleMonthDerement = useCallback(() => dateChange(month - 1, year), [month, year]);

    useEffect(() => {
      if (month > 11) {
        dateChange(0, year + 1);
      }
      if (month < 0) {
        dateChange(11, year - 1);
      }
    }, [month]);

    return (
      <Wrapper>
        <GoBtn onClick={handleMonthDerement}>⟵</GoBtn>
        <Month>
          {monthsRu[month]} {year}г.
        </Month>
        <GoBtn onClick={handleMonthIncrement}>⟶</GoBtn>
      </Wrapper>
    );
  },
);

const monthsRu = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];
