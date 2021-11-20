import styled, { keyframes } from 'styled-components';
import { format } from 'date-fns';
import { CalendarDay } from './CalendarDay';
import { Sales } from '../../../lib/slices/daySales';
import { User } from '../../../lib/globalTypes';
import { Circle } from './Circles';
import { Planes } from '../../../lib/slices/planes/planes.type';
import { calcMounthSales } from '../EveningReport/EveningReport';
import { useEffect, useState } from 'react';

type Props = {
  sales: Sales[] | null;
  newSales: any;
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
  height: 20px;
  font-size: 12pt;
  text-align: center;
  color: ${(props) =>
    props.day === 'Saturday' || props.day === 'Sunday' ? '#b3405b' : 'var (--color-stroke)'};
`;

const CirclesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CircleContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 0 5px #dfdfdf;
  width: 49.3%;
  margin-bottom: 15px;
`;

const Circles = styled.div`
  display: flex;
  flex-direction: row;
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

const H1 = styled.h1`
  color: var(--color-stroke);
  font-size: 20pt;
  margin-top: 10px;
`;

const Mounth = styled.h1`
  font-size: 14pt;
  color: var(--color-stroke);
`;

const weekDays = [
  { value: 'Monday', label: 'Пн' },
  { value: 'Tuesday', label: 'Вт' },
  { value: 'Wednesday', label: 'Ср' },
  { value: 'Thursday', label: 'Чт' },
  { value: 'Friday', label: 'Пт' },
  { value: 'Saturday', label: 'Сб' },
  { value: 'Sunday', label: 'Вс' },
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
  const { newSales, sales, authUser, planes } = props;
  const [mounth, setMounth] = useState(new Date().getMonth());
  const [days, setDays] = useState(getDays(mounth));

  const salesSum = sales ? calcMounthSales(sales) : { cm: 0, ca: 0, cz: 0 };

  const dayCount = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const day = new Date().getDate();
  const cmForecast = (salesSum.cm / day) * dayCount;
  const czForecast = (salesSum.cz / day) * dayCount;
  const caForecast = (salesSum.ca / day) * dayCount;

  useEffect(() => {
    if (mounth > 11) {
      setDays(getDays(1));
      setMounth(1);
    } else if (mounth < 1) {
      setDays(getDays(11));
      setMounth(11);
    } else {
      setDays(getDays(mounth));
    }
  }, [mounth]);

  return (
    <Wrapper>
      <Header>
        <GoBtn onClick={() => setMounth((prev) => prev - 1)}>⟵</GoBtn>
        <Mounth>{mounthsRu[mounth]} 2021г.</Mounth>
        <GoBtn onClick={() => setMounth((prev) => prev + 1)}>⟶</GoBtn>
      </Header>
      <CirclesContainer>
        <CircleContent>
          <H1>Факт</H1>
          <Circles>
            <Circle color={'green'} sale={salesSum.cm} plane={planes.cm} title={'ЦМ'} />
            <Circle color={'red'} sale={salesSum.cz} plane={planes.cz} title={'ЦЗ'} />
            <Circle color={'#9018ad'} sale={salesSum.ca} plane={planes.ca} title={'ЦА'} />
          </Circles>
        </CircleContent>

        <CircleContent>
          <H1>Прогноз</H1>
          <Circles>
            <Circle color={'green'} sale={cmForecast} plane={planes.cm} title={'ЦМ'} />
            <Circle color={'red'} sale={czForecast} plane={planes.cz} title={'ЦЗ'} />
            <Circle color={'#9018ad'} sale={caForecast} plane={planes.ca} title={'ЦА'} />
          </Circles>
        </CircleContent>
      </CirclesContainer>
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
            const newSale = newSales?.find((salesItem: any) => salesItem.day === day.split(' ')[1]);
            return (
              <CalendarDay
                isHollyDay={isHollyDay}
                delay={i}
                daySales={daySales}
                tt={authUser.tt}
                title={day.split(' ')[1]}
                key={i}
                sales={newSale}
              />
            );
          }
        })}
      </CalendarWrapper>
    </Wrapper>
  );
};

function getDays(mounth: number) {
  const daysCount = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const days = [];

  for (let i = 1; i <= daysCount; i++) {
    const day = new Date(new Date().getFullYear(), mounth, i);
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
