import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import styled from 'styled-components';
import { Salesman } from '../../../lib/globalTypes';
import { useTypedSelector } from '../../../lib/hooks';
import { DaySales } from '../../../lib/slices/daySales';
import { planesSelectors } from '../../../lib/slices/planes';
import { Planes } from '../../../lib/slices/planes/planes.type';
import { salesActions, salesSelectors } from '../../../lib/slices/sales';
import { Circle } from '../Calendar/Circles';
import { calcMounthSales } from '../EveningReport/EveningReport';
import { DetailTable } from './DetailTable';

type Props = {
  allSales: DaySales[] | null;
  tt: { label: string; value: string };
  salesmans: Salesman[] | null;
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

const CirclesContainer = styled.div`
  display: flex;
  flex-direction: row;
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

export const DayDetail = (props: Props) => {
  const salesDate = useParams<{ salesDate: string }>().salesDate.replace(/[^0-9]/g, '.');
  const thisDay = useTypedSelector(salesSelectors.selectSalesByDate(salesDate));
  const planes = useTypedSelector(planesSelectors.selectPlanes);
  const dispatch = useDispatch();

  const dayCount = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const day = new Date().getDate();

  const cmDaySales = thisDay?.ttSales[0][8];
  const czDaySales = thisDay?.ttSales[0][10];
  const caDaySales = thisDay?.ttSales[0][12];

  const mounthSales = calcMounthSales(props.allSales);
  const to_cmFact = +((mounthSales.cm / mounthSales.to) * 100).toFixed(2);
  const to_czFact = +((mounthSales.cz / mounthSales.to) * 100).toFixed(2);

  const cmDayPlane = (planes.cm - mounthSales.cm) / (dayCount - day);
  const czDayPlane = (planes.cz - mounthSales.ca) / (dayCount - day);
  const caDayPlane = (planes.cz - mounthSales.ca) / (dayCount - day);

  const [columns, setColumns] = useState(getColumns(planes));

  if (!thisDay || !cmDaySales) {
    return <Redirect to={'/analytics/main'} />;
  }

  return (
    <Wrapper>
      <H1>{salesDate}</H1>

      <CirclesContainer>
        <CircleContent>
          <Circles>
            <Circle color={'green'} sale={cmDaySales!} plane={cmDayPlane} title={'ЦМ'} />
            <Circle color={'red'} sale={czDaySales!} plane={czDayPlane} title={'ЦЗ'} />
            <Circle color={'#9018ad'} sale={caDaySales!} plane={caDayPlane} title={'ЦА'} />
            <Circle color={'green'} sale={to_cmFact} plane={planes.to_cm} title={'ЦМ%'} showFact />
            <Circle color={'red'} sale={to_czFact} plane={planes.to_cz} title={'ЦЗ%'} showFact />
          </Circles>
        </CircleContent>
      </CirclesContainer>

      <DetailTable thisDay={thisDay} columns={columns} ttSales={thisDay.ttSales} />
    </Wrapper>
  );
};

function getColumns(planes: Planes) {
  return [
    {
      label: 'ФИО',
      fn: (sale: any) => sale[0],
    },
    {
      label: 'Устройства',
      fn: (sale: any) => sale[1],
    },
    {
      label: 'ЦМ',
      fn: (sale: any) => sale[8],
    },
    {
      label: 'Доля ЦМ',
      fn: (sale: any) => ((sale[8] / sale[1]) * 100).toFixed(2),
    },
    {
      label: 'Отставание',
      fn: (sale: any) => (sale[8] - (planes.to_cm / 100) * sale[1]).toFixed(0),
    },
    {
      label: 'ЦЗ',
      fn: (sale: any) => sale[10],
    },
    {
      label: 'Доля ЦЗ',
      fn: (sale: any) => ((sale[10] / sale[1]) * 100).toFixed(2),
    },
    {
      label: 'Отставание',
      fn: (sale: any) => (sale[10] - (planes.to_cz / 100) * sale[1]).toFixed(0),
    },
    {
      label: 'ЦА',
      fn: (sale: any) => sale[12],
    },
  ];
}
