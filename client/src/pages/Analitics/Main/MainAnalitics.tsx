import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Preloader } from '../../../Components/Preloader';
import { calcFns, getDaysFormated } from '../../../lib/common';
import { User } from '../../../lib/globalTypes';
import { useTypedSelector } from '../../../lib/hooks';
import { authSelectors } from '../../../lib/slices/auth';
import { DaySales, daySalesSelectors } from '../../../lib/slices/daySales';
import { planesSelectors } from '../../../lib/slices/planes';
import { Planes } from '../../../lib/slices/planes/planes.type';
import { salesSelectors } from '../../../lib/slices/sales';
import { Sales } from '../../../lib/slices/sales/sales.type';
import { Calendar } from '../Calendar';
import { Circle } from '../Circle';
import { DayByDay } from '../DayByDay';
import { getColumns } from '../DayDetail';
import { DetailTable } from '../DayDetail/DetailTable';
import { MounthHeader } from './MounthHeader';

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

export const MainAnalitics = (): JSX.Element => {
  const planes = useTypedSelector(planesSelectors.selectPlanes);
  const authUser = useTypedSelector(authSelectors.selectAuthUser);
  const sales = useTypedSelector(daySalesSelectors.selectAllDaySales);
  const newSales = useTypedSelector(salesSelectors.selectAllSales);

  const [mounth, setMounth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [days, setDays] = useState(getDaysFormated(mounth).days);
  const { weekDays } = getDaysFormated(mounth);

  useEffect(() => {
    setDays(getDaysFormated(mounth).days);
  }, [mounth]);

  if (!sales || !newSales || !authUser) {
    return <Preloader />;
  }

  const mountSales = useMemo(() => calcFns.mounthSalesNew(newSales), [newSales]);
  const salesSum = useMemo(() => calcFns.mounthSales(sales), [sales]);
  const cmForecast = useMemo(() => calcFns.forecastSumm(salesSum.cm), [salesSum]);
  const czForecast = useMemo(() => calcFns.forecastSumm(salesSum.cz), [salesSum]);
  const caForecast = useMemo(() => calcFns.forecastSumm(salesSum.ca), [salesSum]);

  const handleDateChange = useCallback((mounthNumber: number, yearNumber: number) => {
    setMounth(mounthNumber);
    setYear(yearNumber);
  }, []);

  return (
    <Wrapper>
      <MounthHeader dateChange={handleDateChange} mounth={mounth} year={year} />

      <CirclesContainer>
        <CircleContent>
          <CirclesTitle>Факт</CirclesTitle>
          <Circles>
            <Circle color={'green'} sale={salesSum.cm} plane={planes.cm} title={'ЦМ'} />
            <Circle color={'red'} sale={salesSum.cz} plane={planes.cz} title={'ЦЗ'} />
            <Circle color={'#9018ad'} sale={salesSum.ca} plane={planes.ca} title={'ЦА'} />
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
          thisDay={mountSales}
          columns={getColumns(planes)}
          planes={planes}
          ttSales={mountSales.ttSales}
        />
      </DetailContainer>

      <Calendar
        newSales={newSales}
        planes={planes}
        authUser={authUser}
        sales={sales}
        days={days}
        weekDays={weekDays}
      />
    </Wrapper>
  );
};
