import styled, { keyframes } from 'styled-components';
import { format } from 'date-fns';
import { CalendarDay } from './CalendarDay';
import { Sales } from '../../../lib/slices/daySales';

type Props = {
  sales: Sales[] | null;
};

const Wrapper = styled.div`
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

export const MainAnalitics = (props: Props): JSX.Element => {
  const { sales } = props;
  const days = getDays();

  return (
    <Wrapper>
      {days.map((day, i) => {
        if (!day) {
          return <CalendarDay delay={0} key={i} isEmpty title={''} />;
        } else {
          const daySales = sales?.find((salesItem) => salesItem.day === day.split(' ')[1]);
          return <CalendarDay delay={i} daySales={daySales} title={day.split(' ')[1]} key={i} />;
        }
      })}
    </Wrapper>
  );
};

function getDays() {
  const daysCount = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const days = [];

  for (let i = 1; i <= daysCount; i++) {
    const day = new Date(new Date().getFullYear(), new Date().getMonth(), i);
    const formatedDay = format(day, 'iiii dd.MM.yyyy');
    days.push(formatedDay);
  }

  for (let i = 0; i < weekDays.length; i++) {
    const day = days[i];
    if (day) {
      const weekDay = day.split(' ')[0];
      if (weekDay !== weekDays[i]) {
        days.unshift(null);
        continue;
      }
    }
  }

  return days;
}
