import styled from 'styled-components';
import { getDaysFormated } from '../../lib/common';

type Props = {
  from: number;
  to: number;
  changeFrom: (from: number) => void;
  changeTo: (to: number) => void;
};

type StyleProps = {
  chosen: boolean;
  isEmpty: boolean;
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 20px);
`;

const Day = styled.div<StyleProps>`
  width: 20px;
  heifht: 20px;
  padding: 5px;
  background-color: ${(props) => (props.chosen ? 'var(--color-button)' : '#f1f1f1')};
`;

export const DayRange = (props: Props): JSX.Element => {
  const { from, to, changeFrom, changeTo } = props;
  const days = getDaysFormated(new Date().getMonth(), new Date().getFullYear());
  return (
    <Wrapper>
      {days.days.map((day, i) => {
        const dayNumber = day?.split(' ')[1].split('.')[0];
        const thisDay = dayNumber ? parseInt(dayNumber) : 0;
        return (
          <Day isEmpty={!!day} chosen={thisDay <= to && thisDay >= from}>
            {dayNumber ? dayNumber : ' '}
          </Day>
        );
      })}
    </Wrapper>
  );
};
