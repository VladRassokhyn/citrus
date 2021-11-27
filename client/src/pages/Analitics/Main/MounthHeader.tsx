import { memo, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { getDaysFormated } from '../../../lib/common';

type Props = {
  mounth: number;
  year: number;
  dateChange: (mounth: number, year: number) => void;
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

const Mounth = styled.h1`
  font-size: 14pt;
  color: var(--color-stroke);
`;

export const MounthHeader = memo(
  (props: Props): JSX.Element => {
    const { dateChange, mounth, year } = props;

    const handleMounthIncrement = useCallback(() => dateChange(mounth + 1, year), [mounth, year]);
    const handleMounthDerement = useCallback(() => dateChange(mounth - 1, year), [mounth, year]);

    useEffect(() => {
      if (mounth > 11) {
        dateChange(0, year + 1);
      }
      if (mounth < 0) {
        dateChange(11, year - 1);
      }
    }, [mounth]);

    return (
      <Wrapper>
        <GoBtn onClick={handleMounthDerement}>⟵</GoBtn>
        <Mounth>
          {mounthsRu[mounth]} {year}г.
        </Mounth>
        <GoBtn onClick={handleMounthIncrement}>⟶</GoBtn>
      </Wrapper>
    );
  },
);

const mounthsRu = [
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
