import styled from 'styled-components';
import { format } from 'date-fns';
import { CalendarDay } from './CalendarDay';
import { DaySales } from '../../../lib/slices/daySales';
import { User } from '../../../lib/globalTypes';
import { Circle } from './Circles';
import { Planes } from '../../../lib/slices/planes/planes.type';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DayByDay } from '../DayByDay';
import { Sales } from '../../../lib/slices/sales/sales.type';
import { calcFns } from '../../../lib/common';
import { DetailTable } from '../DayDetail/DetailTable';
import { getColumns } from '../DayDetail/DayDetail';

type Props = {
  sales: DaySales[];
  newSales: Sales[];
  authUser: User;
  planes: Planes;
};

type StyleProps = {
  day?: string;
};

const Wrapper = styled.div``;

const CalendarWrapper = styled.div`
  display: flex;
  flex-dirrection: row;
  gap: 5px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 5px #dfdfdf;
`;

const CalendarContent = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const CalendarContainer = styled.div`
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

const WeekToWeek = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px 7px;
  margin-top: 115px;
  align-items: center;
`;

const WeekToWeekItem = styled.div`
  width: 80px;
  height: 150px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const WeekToWeekArrow = styled.div`
  width: 15px;
  height: 144px;
  border-radius: 0 25px 25px 0;
  border-top: 3px solid var(--color-button);
  border-bottom: 3px solid var(--color-button);
  border-right: 3px solid var(--color-button);
`;

const WeekToWeekValues = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
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
  @media (max-width: 559px) {
    display: none;
  }
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
  @media (max-width: 559px) {
    flex-direction: column;
  }
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

const DetailContainer = styled.div`
  border-radius: 5px;
  box-shadow: 0 0 5px #dfdfdf;
  padding: 15px;
  margin: 15px 0;
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
  const [days, setDays] = useState(getDaysFormated(mounth));
  const [weekSales, setWeekSales] = useState<Sales[]>([]);

  console.log(weekSales);

  const salesSum = useMemo(() => (sales ? calcFns.mounthSales(sales) : { cm: 0, ca: 0, cz: 0 }), [
    sales,
  ]);

  const mountSales = calcFns.mounthSalesNew(newSales);

  const cmForecast = useMemo(() => calcFns.forecastSumm(salesSum.cm), [salesSum]);
  const czForecast = useMemo(() => calcFns.forecastSumm(salesSum.cz), [salesSum]);
  const caForecast = useMemo(() => calcFns.forecastSumm(salesSum.ca), [salesSum]);

  const handleMounthIncrement = useCallback(() => setMounth((prev) => prev + 1), []);
  const handleMounthDerement = useCallback(() => setMounth((prev) => prev - 1), []);

  useEffect(() => {
    if (mounth > 11) {
      setDays(getDaysFormated(1));
      setMounth(1);
    } else if (mounth < 1) {
      setDays(getDaysFormated(11));
      setMounth(11);
    } else {
      setDays(getDaysFormated(mounth));
    }
  }, [mounth]);

  return (
    <Wrapper>
      <Header>
        <GoBtn onClick={handleMounthDerement}>⟵</GoBtn>
        <Mounth>{mounthsRu[mounth]} 2021г.</Mounth>
        <GoBtn onClick={handleMounthIncrement}>⟶</GoBtn>
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

      <DayByDay sales={sales} days={days.filter((day) => !!day) as string[]} />

      <DetailContainer>
        {false && (
          <DetailTable
            thisDay={mountSales}
            columns={getColumns(planes)}
            planes={planes}
            ttSales={mountSales.ttSales}
          />
        )}
      </DetailContainer>

      <CalendarWrapper>
        <CalendarContent>
          <WeekTitleWrapper>
            {weekDays.map((day) => (
              <WeekTitle key={day.value} day={day.value}>
                {day.label}
              </WeekTitle>
            ))}
          </WeekTitleWrapper>
          <CalendarContainer>
            {days.map((day, i) => {
              if (!day) {
                return <CalendarDay ttSales={[]} tt={authUser.tt} delay={i} key={i} title={''} />;
              } else {
                const isHollyDay =
                  day.split(' ')[0] === 'Saturday' || day.split(' ')[0] === 'Sunday';
                const daySales = sales.find((salesItem) => salesItem.day === day.split(' ')[1]);
                const newSale = newSales.find((salesItem) => salesItem.day === day.split(' ')[1]);
                const salesByToday = sales.filter(
                  (sale) => parseInt(sale.day) < parseInt(day.split(' ')[1]),
                );
                const mounthSales = calcFns.mounthSales(salesByToday);
                if (day.split(' ')[0] === 'Sunday') {
                  setWeekSales((prev) => [
                    ...prev,
                    calcFns.mounthSalesNew(
                      newSales.filter((sale) => parseInt(sale.day) < parseInt(day.split(' ')[1])),
                    ),
                  ]);
                }
                return (
                  <CalendarDay
                    ttSales={newSale?.ttSales}
                    isHollyDay={isHollyDay}
                    delay={i}
                    daySales={daySales}
                    mounthSales={mounthSales}
                    tt={authUser.tt}
                    planes={planes}
                    title={day.split(' ')[1]}
                    key={i}
                    sales={newSale}
                  />
                );
              }
            })}
          </CalendarContainer>
        </CalendarContent>
        <WeekToWeek>
          <WeekToWeekItem>
            <WeekToWeekArrow />
            <WeekToWeekValues>
              <h5>CM</h5>
              <h5>CZ</h5>
              <h5>CA</h5>
            </WeekToWeekValues>
          </WeekToWeekItem>

          <WeekToWeekItem>
            <WeekToWeekArrow />
            <WeekToWeekValues>
              <h5>CM</h5>
              <h5>CZ</h5>
              <h5>CA</h5>
            </WeekToWeekValues>
          </WeekToWeekItem>

          <WeekToWeekItem>
            <WeekToWeekArrow />
            <WeekToWeekValues>
              <h5>CM</h5>
              <h5>CZ</h5>
              <h5>CA</h5>
            </WeekToWeekValues>
          </WeekToWeekItem>
          <WeekToWeekItem>
            <WeekToWeekArrow />
            <WeekToWeekValues>
              <h5>CM</h5>
              <h5>CZ</h5>
              <h5>CA</h5>
            </WeekToWeekValues>
          </WeekToWeekItem>
        </WeekToWeek>
      </CalendarWrapper>
    </Wrapper>
  );
};

function getDaysFormated(mounth: number) {
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
