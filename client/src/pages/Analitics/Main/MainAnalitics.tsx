import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Preloader } from '../../../Components/Preloader';
import { getCalcFns, getDaysFormated } from '../../../lib/common';
import { useTypedSelector } from '../../../lib/hooks';
import { planesSelectors } from '../../../lib/slices/planes';
import { salesActions, salesSelectors } from '../../../lib/slices/sales';
import { Shop } from '../../../lib/slices/shop';
import { User } from '../../../lib/slices/users';
import { Calendar } from '../Calendar';
import { Circle } from '../Circle';
import { DayByDay } from '../DayByDay';
import { getColumns } from '../DayDetail';
import { DetailTable } from '../DayDetail/DetailTable';
import { MonthHeader } from './MonthHeader';

type Props = {
  authUser: User;
  currentShop: Shop;
};

const Wrapper = styled.div``;

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

const CirclesTitle = styled.h1`
  color: var(--color-stroke);
  font-size: 20pt;
  margin-top: 10px;
`;

const DetailContainer = styled.div`
  border-radius: 5px;
  box-shadow: 0 0 5px #dfdfdf;
  padding: 15px;
  margin: 15px 0;
`;

export const MainAnalitics = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const planes = useTypedSelector(planesSelectors.selectPlanes);
  const sales = useTypedSelector(salesSelectors.selectAllSales);
  const { month, year } = useTypedSelector(salesSelectors.selectMonth);
  const [days, setDays] = useState(getDaysFormated(month, year).days);

  if (!sales) return <Preloader />;

  const lastSales = sales[sales.length - 1];

  const calcFns = getCalcFns(lastSales ? lastSales.day.split('.')[0] : 1, month);

  const mountSales = useMemo(() => calcFns.monthSalesNew(sales), [sales]);
  const salesSum = useMemo(() => calcFns.monthSalesNew(sales), [sales]);
  const cmForecast = useMemo(() => calcFns.forecastSumm(salesSum.ttSales[8]), [salesSum]);
  const czForecast = useMemo(() => calcFns.forecastSumm(salesSum.ttSales[10]), [salesSum]);
  const caForecast = useMemo(() => calcFns.forecastSumm(salesSum.ttSales[12]), [salesSum]);

  useEffect(() => {
    setDays(getDaysFormated(month, year).days);
  }, [month]);

  const handleDateChange = useCallback((monthNumber: number, yearNumber: number) => {
    dispatch(salesActions.setmonth({ year: yearNumber, month: monthNumber }));
  }, []);

  return (
    <Wrapper>
      <MonthHeader dateChange={handleDateChange} month={month} year={year} />

      <CirclesContainer>
        <CircleContent>
          <CirclesTitle>Факт</CirclesTitle>
          <Circles>
            <Circle color={'green'} sale={+salesSum.ttSales[8]} plane={planes.cm} title={'ЦМ'} />
            <Circle color={'red'} sale={+salesSum.ttSales[10]} plane={planes.cz} title={'ЦЗ'} />
            <Circle color={'#9018ad'} sale={+salesSum.ttSales[12]} plane={planes.ca} title={'ЦА'} />
          </Circles>
        </CircleContent>

        <CircleContent>
          <CirclesTitle>Прогноз</CirclesTitle>
          <Circles>
            <Circle color={'green'} sale={cmForecast} plane={planes.cm} title={'ЦМ'} />
            <Circle color={'red'} sale={czForecast} plane={planes.cz} title={'ЦЗ'} />
            <Circle color={'#9018ad'} sale={caForecast} plane={planes.ca} title={'ЦА'} />
          </Circles>
        </CircleContent>
      </CirclesContainer>

      <DayByDay sales={sales} days={days.filter((day) => !!day) as string[]} />

      <DetailContainer>
        <DetailTable
          currentShop={props.currentShop}
          thisDay={mountSales}
          columns={getColumns(planes)}
          planes={planes}
          ttSales={mountSales.ttSales}
        />
      </DetailContainer>

      <Calendar
        sales={sales}
        planes={planes}
        authUser={props.authUser}
        days={days}
        currentShop={props.currentShop}
      />
    </Wrapper>
  );
};
