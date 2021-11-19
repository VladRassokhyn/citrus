import styled, { keyframes } from 'styled-components';
import { format } from 'date-fns';
import { CalendarDay } from './CalendarDay';
import { Sales } from '../../../lib/slices/daySales';
import { User } from '../../../lib/globalTypes';
import { Circle } from './Circles';
import { Planes } from '../../../lib/slices/planes/planes.type';
import { calcMounthSales } from '../EveningReport/EveningReport';

type Props = {
  sales: Sales[] | null;
  authUser: User;
  planes: Planes;
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

const Circles = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const Header = styled.div`
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

const weekDays = [
  { value: 'Monday', label: 'Понедельник' },
  { value: 'Tuesday', label: 'Вторник' },
  { value: 'Wednesday', label: 'Среда' },
  { value: 'Thursday', label: 'Четверг' },
  { value: 'Friday', label: 'Пятница' },
  { value: 'Saturday', label: 'Суббота' },
  { value: 'Sunday', label: 'Воскресенье' },
];

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

export const Calendar = (props: Props): JSX.Element => {
  const { sales, authUser, planes } = props;
  const days = getDays();

  const salesSum = sales ? calcMounthSales(sales) : { cm: 0, ca: 0, cz: 0 };
  const currentMounthRu = getCurrentMounthRu(sales);

  return (
    <Wrapper>
      <Header>
        <GoBtn>⟵</GoBtn>
        <Mounth>{currentMounthRu}</Mounth>
        <GoBtn>⟶</GoBtn>
      </Header>
      <Circles>
        <Circle color={'green'} sale={salesSum.cm} plane={planes.cm} title={'ЦМ'} />
        <Circle color={'red'} sale={salesSum.cz} plane={planes.cz} title={'ЦЗ'} />
        <Circle color={'#9018ad'} sale={salesSum.ca} plane={planes.ca} title={'ЦА'} />
      </Circles>
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

function getCurrentMounthRu(sales: Sales[] | null) {
  if (!sales) {
    return '';
  }
  const salesDay = sales[0] ? sales[0].day : format(new Date(), 'dd.MM.yyyy');
  const mounth = parseInt(salesDay.split('.')[1]);
  const year = salesDay.split('.')[2];
  return `${mounthsRu[mounth - 1]} ${year}г.`;
}
