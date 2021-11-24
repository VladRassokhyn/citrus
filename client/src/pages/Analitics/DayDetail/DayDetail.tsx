import { useParams } from 'react-router';
import styled from 'styled-components';
import { Preloader } from '../../../Components/Preloader';
import { calcFns } from '../../../lib/common';
import { useTypedSelector } from '../../../lib/hooks';
import { DaySales } from '../../../lib/slices/daySales';
import { planesSelectors } from '../../../lib/slices/planes';
import { Planes } from '../../../lib/slices/planes/planes.type';
import { salesSelectors } from '../../../lib/slices/sales';
import { Circle } from '../Calendar/Circles';
import { DetailTable } from './DetailTable';

type Props = {
  allSales: DaySales[] | null;
  tt: { label: string; value: string };
};

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

export const DayDetail = (props: Props): JSX.Element => {
  const salesDate = useParams<{ salesDate: string }>().salesDate.replace(/[^0-9]/g, '.');
  const thisDay = useTypedSelector(salesSelectors.selectSalesByDate(salesDate));
  const planes = useTypedSelector(planesSelectors.selectPlanes);
  const columns = getColumns(planes);

  if (!thisDay) {
    return <Preloader />;
  }
  const dayCount = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const day = new Date().getDate();

  const cmDaySales = thisDay.ttSales[8] as number;
  const czDaySales = thisDay.ttSales[10] as number;
  const caDaySales = thisDay.ttSales[12] as number;

  const mounthSales = calcFns.mounthSales(props.allSales);
  const to_cmFact = calcFns.ratio(+thisDay.ttSales[8], +thisDay.ttSales[1]);
  const to_czFact = calcFns.ratio(+thisDay.ttSales[10], +thisDay.ttSales[1]);

  const cmDayPlane = (planes.cm - mounthSales.cm) / (dayCount - day);
  const czDayPlane = (planes.cz - mounthSales.ca) / (dayCount - day);
  const caDayPlane = (planes.cz - mounthSales.ca) / (dayCount - day);

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

type Column = {
  label: string;
  fn: (sale: (string | number)[]) => string | number;
};

export function getColumns(planes: Planes): Column[] {
  return [
    {
      label: 'ФИО',
      fn: (sale: (string | number)[]) => sale[0],
    },
    {
      label: 'Устройства',
      fn: (sale: (string | number)[]) => sale[1],
    },
    {
      label: 'ЦМ',
      fn: (sale: (string | number)[]) => sale[8],
    },
    {
      label: 'Доля ЦМ',
      fn: (sale: (string | number)[]) => {
        if (+sale[1] === 0) {
          return 100;
        } else {
          return ((+sale[8] / +sale[1]) * 100).toFixed(2);
        }
      },
    },
    {
      label: 'Отставание',
      fn: (sale: (string | number)[]) =>
        (+sale[8] - (parseFloat(planes.to_cm + '') / 100) * +sale[1]).toFixed(0),
    },
    {
      label: 'ЦЗ',
      fn: (sale: (string | number)[]) => sale[10],
    },
    {
      label: 'Доля ЦЗ',
      fn: (sale: (string | number)[]) => {
        if (+sale[1] === 0) {
          return 100;
        } else {
          return ((+sale[10] / +sale[1]) * 100).toFixed(2);
        }
      },
    },
    {
      label: 'Отставание',
      fn: (sale: (string | number)[]) => {
        return (+sale[10] - (parseFloat(planes.to_cz + '') / 100) * +sale[1]).toFixed(0);
      },
    },
    {
      label: 'ЦА',
      fn: (sale: (string | number)[]) => sale[12],
    },
  ];
}
