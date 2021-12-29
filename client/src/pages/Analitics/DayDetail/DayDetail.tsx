import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { Preloader } from '@components/Preloader';
import { getCalcFns } from '@lib/common';
import { ServicesColors } from '@lib/globalTypes';
import { useTypedSelector } from '@lib/hooks';
import { planesSelectors } from '@lib/slices/planes';
import { SalesIndexes, salesSelectors } from '@lib/slices/sales';
import { Shop } from '@lib/slices/shop';
import { Circle } from '../Circle/Circle';
import { DetailTable } from './DetailTable';
import { getColumns } from './getColumns';

type Props = {
  currentShop: Shop;
};

const Wrapper = styled.div`
  width: 100%;
`;

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
  @media (max-width: 560px) {
    grid-template-columns: 50% 50%;
  }
`;

const CircleContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 0 5px #dfdfdf;
  width: 103%;
  margin-bottom: 15px;
  @media (max-width: 560px) {
    width: 94%;
  }
`;

const DetailContainer = styled.div`
  border-radius: 5px;
  box-shadow: 0 0 5px #dfdfdf;
  padding: 15px;
  margin: 15px 0;
  @media (max-width: 560px) {
    overflow-x: scroll;
  }
`;

const Circles = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  @media (max-width: 560px) {
    flex-direction: column;
  }
`;

export const DayDetail = (props: Props): JSX.Element => {
  const salesDate = useParams<{ salesDate: string }>().salesDate.replace(/[^0-9]/g, '.');
  const thisDaySales = useTypedSelector(salesSelectors.salesByDate(salesDate));
  const sales = useTypedSelector(salesSelectors.sales);
  const planes = useTypedSelector(planesSelectors.planes);
  const columns = getColumns(planes);

  if (!thisDaySales) {
    return <Preloader />;
  }

  const calcFns = getCalcFns();

  const monthSales = calcFns.monthSalesNew(sales);
  const to_cmFact = calcFns.ratio(
    thisDaySales.ttSales[SalesIndexes.CM],
    thisDaySales.ttSales[SalesIndexes.DEVICES],
  );
  const to_czFact = calcFns.ratio(
    thisDaySales.ttSales[SalesIndexes.CZ],
    thisDaySales.ttSales[SalesIndexes.DEVICES],
  );

  const cmDayPlane = calcFns.dayPlane(monthSales.ttSales[SalesIndexes.CM], planes.cm);
  const czDayPlane = calcFns.dayPlane(monthSales.ttSales[SalesIndexes.CZ], planes.cz);
  const caDayPlane = calcFns.dayPlane(monthSales.ttSales[SalesIndexes.CA], planes.ca);

  return (
    <Wrapper>
      <H1>{salesDate}</H1>

      <CirclesContainer>
        <CircleContent>
          <H2>Выполнение планов</H2>
          <Circles>
            <Circle
              color={ServicesColors.CM}
              sale={thisDaySales.ttSales[SalesIndexes.CM]}
              plane={cmDayPlane}
              title={'ЦМ'}
            />
            <Circle
              color={ServicesColors.CZ}
              sale={thisDaySales.ttSales[SalesIndexes.CZ]}
              plane={czDayPlane}
              title={'ЦЗ'}
            />
            <Circle
              color={ServicesColors.CA}
              sale={thisDaySales.ttSales[SalesIndexes.CA]}
              plane={caDayPlane}
              title={'ЦА'}
            />
          </Circles>
        </CircleContent>
        <CircleContent>
          <H2>Выполнение доли</H2>
          <Circles>
            <Circle color={ServicesColors.CM} sale={to_cmFact} plane={planes.to_cm} title={'ЦМ%'} />
            <Circle color={ServicesColors.CZ} sale={to_czFact} plane={planes.to_cz} title={'ЦЗ%'} />
          </Circles>
        </CircleContent>
      </CirclesContainer>

      <DetailContainer>
        <DetailTable planes={planes} sales={thisDaySales} columns={columns} />
      </DetailContainer>
    </Wrapper>
  );
};
