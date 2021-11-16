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
`;

export const MainAnalitics = (props: Props): JSX.Element => {
  const { sales } = props;
  const days = getDays();

  return (
    <Wrapper>
      {days.map((day, i) => {
        if (!day) {
          return <CalendarDay delay={0} key={day} isEmpty title={''} />;
        } else {
          return <CalendarDay delay={i} title={day.split(' ')[1]} key={day} />;
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
    const weekDay = days[i].split(' ')[0];
    if (weekDay !== weekDays[i]) {
      days.unshift(null);
      break;
    }
  }

  return days;
}
