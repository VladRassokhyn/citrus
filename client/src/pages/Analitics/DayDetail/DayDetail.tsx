import { useParams } from 'react-router';
import styled from 'styled-components';
import { Preloader } from '../../../Components/Preloader';
import { getCalcFns } from '../../../lib/common';
import { useTypedSelector } from '../../../lib/hooks';
import { planesSelectors } from '../../../lib/slices/planes';
import { salesSelectors } from '../../../lib/slices/sales';
import { Circle } from '../Circle/Circle';
import { DetailTable } from './DetailTable';
import { getColumns } from './getColumns';

const Wrapper = styled.div``;

const H1 = styled.h1`
  font-size: 20pt;
  width: 100%;
  padding: 5px 0;
  margin-bottom: 15px;
  text-align: center;
  color: var(--color-stroke);
  box-shadow: 0 0 5px #dfdfdf;
  border-radius: 5px;
`;

const H2 = styled.h1`
  margin-top: 20px;
  font-size: 16pt;
  width: 100%;
  text-align: center;
  color: var(--color-stroke);
`;

const CirclesContainer = styled.div`
  display: grid;
  grid-template-columns: 63% 33%;
  gap: 3%;
`;

const CircleContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 0 5px #dfdfdf;
  width: 103%;
  margin-bottom: 15px;
`;

const Circles = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;

export const DayDetail = (): JSX.Element => {
  const salesDate = useParams<{ salesDate: string }>().salesDate.replace(/[^0-9]/g, '.');
  const thisDay = useTypedSelector(salesSelectors.selectSalesByDate(salesDate));
  const sales = useTypedSelector(salesSelectors.selectAllSales);
  const planes = useTypedSelector(planesSelectors.selectPlanes);
  const columns = getColumns(planes);

  if (!thisDay) {
    return <Preloader />;
  }

  const dayCount = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const day = new Date().getDate();

  const calcFns = getCalcFns();

  const cmDaySales = thisDay.ttSales[8] as number;
  const czDaySales = thisDay.ttSales[10] as number;
  const caDaySales = thisDay.ttSales[12] as number;

  const monthSales = calcFns.monthSalesNew(sales);
  const to_cmFact = calcFns.ratio(+thisDay.ttSales[8], +thisDay.ttSales[1]);
  const to_czFact = calcFns.ratio(+thisDay.ttSales[10], +thisDay.ttSales[1]);

  const cmDayPlane = (planes.cm - +monthSales.ttSales[8]) / (dayCount - day);
  const czDayPlane = (planes.cz - +monthSales.ttSales[10]) / (dayCount - day);
  const caDayPlane = (planes.cz - +monthSales.ttSales[12]) / (dayCount - day);

  return (
    <Wrapper>
      <H1>{salesDate}</H1>

      <CirclesContainer>
        <CircleContent>
          <H2>Выполнение планов</H2>
          <Circles>
            <Circle color={'green'} sale={cmDaySales} plane={cmDayPlane} title={'ЦМ'} />
            <Circle color={'red'} sale={czDaySales} plane={czDayPlane} title={'ЦЗ'} />
            <Circle color={'#9018ad'} sale={caDaySales} plane={caDayPlane} title={'ЦА'} />
          </Circles>
        </CircleContent>
        <CircleContent>
          <H2>Выполнение доли</H2>
          <Circles>
            <Circle color={'green'} sale={to_cmFact} plane={planes.to_cm} title={'ЦМ%'} />
            <Circle color={'red'} sale={to_czFact} plane={planes.to_cz} title={'ЦЗ%'} />
          </Circles>
        </CircleContent>
      </CirclesContainer>

      <DetailTable planes={planes} thisDay={thisDay} columns={columns} ttSales={thisDay.ttSales} />
    </Wrapper>
  );
};
