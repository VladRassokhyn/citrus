import styled, { keyframes } from 'styled-components';
import { format } from 'date-fns';
import { CalendarDay } from './CalendarDay';
import { Sales } from '../../../lib/slices/daySales';
import { User } from '../../../lib/globalTypes';

type Props = {
  sales: Sales[] | null;
  authUser: User;
};

type StyleProps = {
  day?: string;
};

const Wrapper = styled.div``;

const CalendarWrapper = styled.div`
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

const WeekTitleWrapper = styled.div`
  display: grid;
  gap: 0 1px;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px #dfdfdf;
  background-color: #dfdfdf;
`;

const WeekTitle = styled.h1<StyleProps>`
  padding: 5px;
  background-color: white;
  min-width: 100px;
  height: 20px;
  font-size: 12pt;
  text-align: center;
  color: ${(props) =>
    props.day === 'Saturday' || props.day === 'Sunday' ? '#b3405b' : 'var (--color-stroke)'};
`;

const weekDays = [
  { value: 'Monday', label: 'Понедельник' },
  { value: 'Tuesday', label: 'Вторник' },
  { value: 'Wednesday', label: 'Среда' },
  { value: 'Thursday', label: 'Четверг' },
  { value: 'Friday', label: 'Пятница' },
  { value: 'Saturday', label: 'Суббота' },
  { value: 'Sunday', label: 'Воскресенье' },
];

export const MainAnalitics = (props: Props): JSX.Element => {
  const { sales, authUser } = props;
  const days = getDays();

  return (
    <Wrapper>
      <WeekTitleWrapper>
        {weekDays.map((day) => (
          <WeekTitle key={day.value} day={day.value}>
            {day.label}
          </WeekTitle>
        ))}
      </WeekTitleWrapper>
      <CalendarWrapper>
        {days.map((day, i) => {
          if (!day) {
            return <CalendarDay tt={authUser.tt} delay={0} key={i} isEmpty title={''} />;
          } else {
            const isHollyDay = day.split(' ')[0] === 'Saturday' || day.split(' ')[0] === 'Sunday';
            const daySales = sales?.find((salesItem) => salesItem.day === day.split(' ')[1]);
            return (
              <CalendarDay
                isHollyDay={isHollyDay}
                delay={i}
                daySales={daySales}
                tt={authUser.tt}
                title={day.split(' ')[1]}
                key={i}
              />
            );
          }
        })}
      </CalendarWrapper>
    </Wrapper>
  );
};

function getDays() {
  const daysCount = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
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
      if (weekDay !== weekDays[i].value) {
        days.unshift(null);
        continue;
      }
    }
  }

  return days;
}
