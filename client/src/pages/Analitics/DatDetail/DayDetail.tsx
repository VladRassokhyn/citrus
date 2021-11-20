import { useState } from 'react';
import { Redirect, useParams } from 'react-router';
import styled from 'styled-components';
import { Salesman } from '../../../lib/globalTypes';
import { useTypedSelector } from '../../../lib/hooks';
import { DaySales } from '../../../lib/slices/daySales';
import { planesSelectors } from '../../../lib/slices/planes';
import { salesSelectors } from '../../../lib/slices/sales';
import { Sales } from '../../../lib/slices/sales/sales.type';
import { Circle } from '../Calendar/Circles';
import { calcMounthSales } from '../EveningReport/EveningReport';
import { TableRow } from './TableRow';

type Props = {
  allSales: any;
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
  const salesmans = props.salesmans && [
    ...props.salesmans,
    { id: 0, name: props.tt.label, tt: props.tt.value },
  ];
  const salesmansNames = salesmans?.map((salesman) => salesman.name);
  const { salesDate } = useParams<{ salesDate: string }>();
  const sales = useTypedSelector(
    salesSelectors.selectSalesByDate(salesDate.replace(/[^0-9]/g, '.')),
  );

  if (!sales) {
    return <Redirect to={'/analytics/main'} />;
  }

  console.log(props.allSales);

  const planes = useTypedSelector(planesSelectors.selectPlanes);
  const dayCount = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const day = new Date().getDate();

  function getCmLag(sales: string[]) {
    return (getCm(sales) - (getTo(sales) / 100) * planes.to_cm).toFixed(0);
  }

  function getCzLag(sales: string[]) {
    return (getCm(sales) - (getTo(sales) / 100) * planes.to_cz).toFixed(0);
  }

  const [columns, setColumns] = useState([
    getName,
    getTo,
    getCm,
    getCmRatio,
    getCmLag,
    getCz,
    getCzRatio,
    getCzLag,
    getCa,
  ]);

  const cmDaySales = parseInt(sales!.sales[3][8].replace(/\s/g, ''));
  const czDaySales = parseInt(sales!.sales[3][10].replace(/\s/g, ''));
  const caDaySales = parseInt(sales!.sales[3][12].replace(/\s/g, ''));

  const mounthSales = calcMounthSales(props.allSales);
  const to_cmFact = +((mounthSales.cm / mounthSales.to) * 100).toFixed(2);
  const to_czFact = +((mounthSales.cz / mounthSales.to) * 100).toFixed(2);

  const cmDayPlane = (planes.cm - mounthSales.cm) / (dayCount - day);
  const czDayPlane = (planes.cz - mounthSales.ca) / (dayCount - day);
  const caDayPlane = (planes.cz - mounthSales.ca) / (dayCount - day);

  return (
    <Wrapper>
      <H1>{salesDate.replace(/[^0-9]/g, '.')}</H1>

      <CirclesContainer>
        <CircleContent>
          <Circles>
            <Circle color={'green'} sale={cmDaySales} plane={cmDayPlane} title={'ЦМ'} />
            <Circle color={'red'} sale={czDaySales} plane={czDayPlane} title={'ЦЗ'} />
            <Circle color={'#9018ad'} sale={caDaySales} plane={caDayPlane} title={'ЦА'} />
            <Circle color={'green'} sale={to_cmFact} plane={planes.to_cm} title={'ЦМ%'} showFact />
            <Circle color={'red'} sale={to_czFact} plane={planes.to_cz} title={'ЦЗ%'} showFact />
          </Circles>
        </CircleContent>
      </CirclesContainer>

      <TableRow
        isMainTable
        isTT={false}
        isHeader
        cells={[
          'ФИО',
          'Устройства',
          'ЦМ',
          'Доля ЦМ',
          'Отставание',
          'ЦЗ',
          'Доля ЦЗ',
          'Отставание',
          'ЦА',
        ]}
      />
      {sales?.sales.map((daySales, i) => {
        if (salesmansNames?.includes(daySales[0])) {
          return (
            <TableRow
              isMainTable
              key={i}
              isTT={i === 3}
              cells={columns.map((columnFn) => columnFn(daySales))}
            />
          );
        }
      })}
    </Wrapper>
  );
};

function getName(sales: string[]) {
  return `${sales[0].split(' ')[0]} ${sales[0].split(' ')[1]}`;
}

function getTo(sales: string[]) {
  const cell = parseInt(sales[1].replace(/\s/g, ''));
  return isNaN(+cell) ? 0 : cell;
}

function getCm(sales: string[]) {
  const cell = parseInt(sales[8].replace(/\s/g, ''));
  return isNaN(+cell) ? 0 : cell;
}

function getCz(sales: string[]) {
  const cell = parseInt(sales[10].replace(/\s/g, ''));
  return isNaN(+cell) ? 0 : cell;
}

function getCa(sales: string[]) {
  const cell = parseInt(sales[12].replace(/\s/g, ''));
  return isNaN(+cell) ? 0 : cell;
}

function getCmRatio(sales: string[]) {
  const cell = (
    (parseInt(sales[8].replace(/\s/g, '')) / parseInt(sales[1].replace(/\s/g, ''))) *
    100
  ).toFixed(2);
  return isNaN(+cell) ? 0 : cell;
}

function getCzRatio(sales: string[]) {
  const cell = (
    (parseInt(sales[10].replace(/\s/g, '')) / parseInt(sales[1].replace(/\s/g, ''))) *
    100
  ).toFixed(2);
  return isNaN(+cell) ? 0 : cell;
}
